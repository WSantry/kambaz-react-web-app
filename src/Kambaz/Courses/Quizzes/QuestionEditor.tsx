/* ──────────────────────────────────────────────────────────────
   Multi-blank FIB Editor — integer IDs (1…n, no gaps)
──────────────────────────────────────────────────────────────── */
import { useEffect, useState } from "react";
import {
  Nav,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import {
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as api from "./client";
import { updateQuiz as storeUpdateQuiz } from "./reducer"; 

/* ── types ─ */
type QType = "MCQ" | "TF" | "FIB";
interface MCQOption {
  _id: string;
  text: string;
  correct: boolean;
}
interface FIBBlank {
  _id: string;          // "1", "2", …
  answers: string[];
}
interface Question {
  _id: string;
  quizId: string;
  qType: QType;
  title: string;
  points: number;
  body: string;
  mcqOptions: MCQOption[];
  tfAnswer?: boolean;
  fibBlanks?: FIBBlank[];
}

/* ── regex & helpers ─ */
const BLANK_RE = /___([1-9][0-9]*)___/g;        // integers only
const extractIds = (body: string): number[] => {
  const s = new Set<number>();
  let m;
  while ((m = BLANK_RE.exec(body))) s.add(Number(m[1]));
  return [...s].sort((a, b) => a - b);
};

export default function QuestionEditor() {
  const { cid, qid, qqid } = useParams<{
    cid?: string;
    qid?: string;
    qqid?: string;
  }>();
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const storeQs: Question[] = useSelector(
    (s: any) => s.quizzesReducer.questions
  );

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [fibError, setFibError] = useState<string | null>(null);

  /* ── fetch ─ */
  useEffect(() => {
    (async () => {
      if (!qid || !qqid) return;
      let q = storeQs.find((x) => x._id === qqid);
      if (!q) q = (await api.listQuestions(qid)).find(
        (x: Question) => x._id === qqid
      );
      if (q?.qType === "FIB" && !q.fibBlanks) q.fibBlanks = [];
      setQuestion(q ?? null);
      setLoading(false);
    })();
  }, [qid, qqid, storeQs]);

  /* ── generic setter ─ */
  const handle = <K extends keyof Question>(
    k: K,
    v: Question[K]
  ) => setQuestion((p) => (p ? { ...p, [k]: v } : p));

  /* ── MCQ helpers (unchanged) ─ */
  const addMCQ = () =>
    handle("mcqOptions", [
      ...(question!.mcqOptions || []),
      { _id: uuidv4(), text: "", correct: false },
    ]);
  const updMCQ = (id: string, t: string) =>
    handle(
      "mcqOptions",
      question!.mcqOptions.map((o) =>
        o._id === id ? { ...o, text: t } : o
      )
    );
  const delMCQ = (id: string) =>
    handle(
      "mcqOptions",
      question!.mcqOptions.filter((o) => o._id !== id)
    );
  const setCorrect = (id: string) =>
    handle(
      "mcqOptions",
      question!.mcqOptions.map((o) => ({
        ...o,
        correct: o._id === id,
      }))
    );

  /* ── FIB helpers ─ */
  const syncFib = (body: string) => {
    const ids = extractIds(body);            // unique, sorted numbers
    /* validate continuity */
    const continuous =
      ids.every((id, idx) => id === idx + 1) || ids.length === 0;

    if (!continuous) {
      setFibError(
        "Blanks must be numbered 1, 2, 3… with no gaps."
      );
      return;                                // do NOT mutate fibBlanks
    }

    setFibError(null);

    /* build/update fibBlanks */
    let blanks = [...(question!.fibBlanks || [])];

    // add new IDs
    ids.forEach((id) => {
      const idStr = id.toString();
      if (!blanks.find((b) => b._id === idStr))
        blanks.push({ _id: idStr, answers: [""] });
    });
    // remove now-absent IDs
    blanks = blanks.filter((b) =>
      ids.includes(Number(b._id))
    );
    blanks.sort(
      (a, b) => Number(a._id) - Number(b._id)
    );
    handle("fibBlanks", blanks);
  };

  const updAnswer = (bIdx: number, aIdx: number, val: string) => {
  const newBlanks = question!.fibBlanks!.map((b, i) =>
    i === bIdx
      ? {
          ...b,
          answers: b.answers.map((a, j) =>
            j === aIdx ? val : a
          ),
        }
      : b
  );
  handle("fibBlanks", newBlanks);
};

const addAnswer = (bIdx: number) => {
  const newBlanks = question!.fibBlanks!.map((b, i) =>
    i === bIdx ? { ...b, answers: [...b.answers, ""] } : b
  );
  handle("fibBlanks", newBlanks);
};

const delAnswer = (bIdx: number, aIdx: number) => {
  const newBlanks = question!.fibBlanks!.map((b, i) =>
    i === bIdx
      ? {
          ...b,
          answers:
            b.answers.length === 1
              ? [""]
              : b.answers.filter((_, j) => j !== aIdx),
        }
      : b
  );
  handle("fibBlanks", newBlanks);
};


  /* ── save / cancel ─ */
 const save = async () => {
  if (!qid || !question || fibError) return;

  /* save question */
  await api.updateQuestion(qid, question);

  /* fetch updated quiz to get the new total points */
  const updatedQuiz = await api.getQuiz(qid);
  dispatch(storeUpdateQuiz(updatedQuiz));      // keeps list/details in sync

  navigate(
    `/Kambaz/Courses/${cid}/Quizzes/${qid}/questions`
  );
};
  const cancel = () =>
    navigate(
      `/Kambaz/Courses/${cid}/Quizzes/${qid}/questions`
    );

  /* ── UI helpers ─ */
  const inactive = (tab: "DETAILS" | "QUESTIONS") =>
    tab === "QUESTIONS" ? "" : "text-danger";

  const instructions: Record<QType, string> = {
    MCQ:
      "Enter your question and multiple answers, then select the one correct answer.",
    TF:
      "Enter your question text, then select if True or False is the correct answer.",
    FIB:
      "Use ___1___, ___2___ … in the question text. Numbers must start at 1 and have no gaps. For each blank, list accepted answers below.",
  };

  /* ── render ─ */
  if (loading || !question) return <Spinner className="m-3" />;

  return (
    <div className="p-3">
      {/* tab bar */}
      <Nav variant="tabs" activeKey="QUESTIONS" className="mb-3">
        <Nav.Item>
          <Nav.Link
            eventKey="DETAILS"
            as={Link as any}
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`}
            className={inactive("DETAILS")}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="QUESTIONS"
            as={Link as any}
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/questions`}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* top row */}
      <div className="d-flex gap-3 mb-2">
        <Form.Control
          placeholder="Title"
          value={question.title}
          onChange={(e) => handle("title", e.target.value)}
        />

        <Form.Select
          style={{ maxWidth: 220 }}
          value={question.qType}
          onChange={(e) => {
            const v = e.target.value as QType;
            if (v !== "FIB") handle("fibBlanks", []);
            if (v === "MCQ" && question.qType !== "MCQ")
              handle("mcqOptions", [
                { _id: uuidv4(), text: "", correct: true },
                { _id: uuidv4(), text: "", correct: false },
              ]);
            if (v === "TF" && question.qType !== "TF")
              handle("tfAnswer", true);
            handle("qType", v);
          }}
        >
          <option value="MCQ">Multiple Choice</option>
          <option value="TF">True / False</option>
          <option value="FIB">Fill in the Blank</option>
        </Form.Select>

        <div style={{ maxWidth: 120 }}>
          <Form.Label className="fw-semibold">Points</Form.Label>
          <Form.Control
            type="number"
            min={1}
            value={question.points}
            onChange={(e) =>
              handle("points", Number(e.target.value) || 1)
            }
          />
        </div>
      </div>

      <hr />

      <p className="mb-4">{instructions[question.qType]}</p>

      {fibError && (
        <Alert
          variant="warning"
          onClose={() => setFibError(null)}
          dismissible
          className="py-2"
        >
          {fibError}
        </Alert>
      )}

      {/* body */}
      <h6 className="fw-semibold">Question:</h6>
      <Form.Control
        as="textarea"
        rows={4}
        className="mb-4"
        placeholder="Question text…"
        value={question.body}
        onChange={(e) => {
          const val = e.target.value;
          handle("body", val);
          if (question.qType === "FIB") syncFib(val);
        }}
      />

      {/* MCQ UI (unchanged) */}
      {question.qType === "MCQ" && (
        <>
          <h6 className="fw-semibold">Answers:</h6>
          {question.mcqOptions.map((o, i) => (
            <div
              key={o._id}
              className="d-flex align-items-center mb-2"
            >
              <Form.Check
                type="radio"
                name="mcq_correct"
                className="me-2"
                checked={o.correct}
                onChange={() => setCorrect(o._id)}
              />
              <Form.Control
                placeholder={`Possible Answer ${i + 1}`}
                value={o.text}
                onChange={(e) => updMCQ(o._id, e.target.value)}
              />
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-2"
                onClick={() => delMCQ(o._id)}
              >
                &times;
              </Button>
            </div>
          ))}
          <Button
            variant="link"
            className="text-danger p-0"
            onClick={addMCQ}
          >
            + Add Another Answer
          </Button>
        </>
      )}

      {/* TF UI (unchanged) */}
      {question.qType === "TF" && (
        <>
          <h6 className="fw-semibold">Answers:</h6>
          <Form.Check
            type="radio"
            name="tf_correct"
            label="True"
            className="mb-2"
            checked={question.tfAnswer === true}
            onChange={() => handle("tfAnswer", true)}
          />
          <Form.Check
            type="radio"
            name="tf_correct"
            label="False"
            checked={question.tfAnswer === false}
            onChange={() => handle("tfAnswer", false)}
          />
        </>
      )}

      {/* FIB UI */}
      {question.qType === "FIB" && (
        <>
          {question.fibBlanks!.map((blank, bIdx) => (
            <div key={blank._id} className="mb-4">
              <h6 className="fw-semibold">
                Blank {blank._id}:
              </h6>
              {blank.answers.map((ans, aIdx) => (
                <div
                  key={aIdx}
                  className="d-flex align-items-center mb-2"
                >
                  <Form.Control
                    placeholder="Possible Answer"
                    value={ans}
                    onChange={(e) =>
                      updAnswer(bIdx, aIdx, e.target.value)
                    }
                  />
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => delAnswer(bIdx, aIdx)}
                  >
                    &times;
                  </Button>
                </div>
              ))}
              <Button
                variant="link"
                className="text-danger p-0"
                onClick={() => addAnswer(bIdx)}
              >
                + Add Another Answer
              </Button>
            </div>
          ))}

          {question.fibBlanks!.length === 0 && (
            <p className="text-muted">
              Add <code>___1___</code>, <code>___2___</code>, etc.
              inside the question text to create blanks.
            </p>
          )}
        </>
      )}

      {/* bottom controls */}
      <hr className="mt-4" />
      <div className="text-end">
        <Button
          variant="secondary"
          className="me-2"
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={!!fibError}
          onClick={save}
        >
          Update Question
        </Button>
      </div>
    </div>
  );
}
