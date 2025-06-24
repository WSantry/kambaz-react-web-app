/* ──────────────────────────────────────────────────────────────
   File: src/Kambaz/Courses/Quizzes/QuestionEditor.tsx
──────────────────────────────────────────────────────────────── */
import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Nav,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import * as api from "./client";
import { updateQuestion as storeUpdate } from "./reducer";

/* ── types ─ */
type QType = "MCQ" | "TF" | "FIB";
interface MCQOption {
  _id: string;
  text: string;
  correct: boolean;
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
  fibAnswers?: string[];
}

export default function QuestionEditor() {
  const { cid, qid, qqid } = useParams<{
    cid?: string;
    qid?: string;
    qqid?: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storeQs: Question[] = useSelector(
    (s: any) => s.quizzesReducer.questions
  );

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  /* ── fetch ─ */
  useEffect(() => {
    (async () => {
      if (!qid || !qqid) return;

      let q = storeQs.find((x) => x._id === qqid);
      if (!q) {
        const list = await api.listQuestions(qid);
        q = list.find((x: Question) => x._id === qqid);
      }
      setQuestion(q ?? null);
      setLoading(false);
    })();
  }, [qid, qqid, storeQs]);

  /* ── handlers ─ */
  const handle = <K extends keyof Question>(
    k: K,
    v: Question[K]
  ) => setQuestion((p) => (p ? { ...p, [k]: v } : p));

  /* MCQ helpers */
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

  /* FIB helpers */
  const addFIB = () =>
    handle("fibAnswers", [...(question!.fibAnswers || []), ""]);
  const updFIB = (i: number, v: string) => {
    const arr = [...(question!.fibAnswers || [])];
    arr[i] = v;
    handle("fibAnswers", arr);
  };
  const delFIB = (i: number) => {
    const arr = [...(question!.fibAnswers || [])];
    arr.splice(i, 1);
    handle("fibAnswers", arr);
  };

  /* save / cancel */
  const save = async () => {
    if (!qid || !question) return;
    const saved = await api.updateQuestion(qid, question);
    dispatch(storeUpdate(saved));
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
      "Enter your question text including a ________, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.",
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

      {/* top row: title | type | points */}
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
            if (v === "MCQ" && question.qType !== "MCQ") {
              handle("mcqOptions", [
                {
                  _id: uuidv4(),
                  text: "",
                  correct: true,
                },
                {
                  _id: uuidv4(),
                  text: "",
                  correct: false,
                },
              ]);
            }
            if (v === "TF" && question.qType !== "TF") {
              handle("tfAnswer", true);
            }
            if (v === "FIB" && question.qType !== "FIB") {
              handle("fibAnswers", [""]);
            }
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

      {/* instructions */}
      <p className="mb-4">{instructions[question.qType]}</p>

      {/* question body */}
      <h6 className="fw-semibold">Question:</h6>
      <Form.Control
        as="textarea"
        rows={4}
        className="mb-4"
        placeholder="Question text…"
        value={question.body}
        onChange={(e) => handle("body", e.target.value)}
      />

      {/* MCQ UI */}
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
                placeholder={`Option ${i + 1}`}
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
            className="text-danger p-0 no-underline"
            onClick={addMCQ}
          >
            + Add Another Answer
          </Button>
        </>
      )}

      {/* TF UI */}
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
          <h6 className="fw-semibold">Answers:</h6>
          {(question.fibAnswers || []).map((ans, i) => (
            <div
              key={i}
              className="d-flex align-items-center mb-2"
            >
              <Form.Control
                placeholder="Possible Answer"
                value={ans}
                onChange={(e) => updFIB(i, e.target.value)}
              />
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-2"
                onClick={() => delFIB(i)}
              >
                &times;
              </Button>
            </div>
          ))}
          <Button
            variant="link"
            className="text-danger p-0 no-underline"
            onClick={addFIB}
          >
            + Add Another Answer
          </Button>
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
        <Button variant="danger" onClick={save}>
          Update Question
        </Button>
      </div>
    </div>
  );
}
