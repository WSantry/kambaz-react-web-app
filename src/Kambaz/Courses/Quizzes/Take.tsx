/* ──────────────────────────────────────────────────────────────
   Quiz runner – used by BOTH students (“take”) and faculty (“preview”)
──────────────────────────────────────────────────────────────── */
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Card,
  Pagination,
  Button,
  Alert,
  Badge,
} from "react-bootstrap";
import { marked } from "marked";
import * as api from "./client";
import "./Quizzes.css";

/* ── helpers ────────────────────────────────────────────────── */
type MCQVal = string;                 // option _id
type TFVal  = boolean;                // true / false
type FIBVal = Record<string, string>; // { blankId:"answer", … }
type Answer = MCQVal | TFVal | FIBVal;

const BLANK_RE = /___([1-9][0-9]*)___/g;
const extractIds = (body = ""): string[] =>
  [...body.matchAll(BLANK_RE)].map((m) => m[1]);

const renderBody = (body: string = "") =>
  marked.parse(
    body.replace(BLANK_RE, (_, id) => `<span class="fib-blank">${id}</span>`)
  );

/* ── component ──────────────────────────────────────────────── */
export default function TakeQuiz({ preview = false }: { preview?: boolean }) {
  const { qid } = useParams<{ qid?: string }>();
  const currentUser = useSelector((s: any) => s.accountReducer.currentUser);

  /* state */
  const [quiz,      setQuiz]      = useState<any | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [cursor,    setCursor]    = useState(0);
  const [answers,   setAnswers]   = useState<Record<string, Answer>>({});
  const [result,    setResult]    = useState<null | {
    score:   number;
    correct: Record<string, boolean>;
    answers: Record<string, Answer>;
  }>(null);
  const [attempts,  setAttempts]  = useState<any[]>([]);
  const [timeLeft,  setTimeLeft]  = useState<number>(0); // seconds remaining

  /* refs */
  const warned3Min   = useRef(false);
  const warned30Sec  = useRef(false);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const submittedRef = useRef(false);
  const startedRef   = useRef(false); // tracks whether countdown actually began

  /* ── helpers ──────────────────────────────────────────────── */
  const recordAnswer = (val: Answer) =>
    setAnswers((p) => ({ ...p, [questions[cursor]._id]: val }));

  function scoreQuiz() {
    let score = 0;
    const correct: Record<string, boolean> = {};

    for (const qq of questions) {
      const ans = answers[qq._id];

      /* default values */
      let ok = false;
      let pointsEarned = 0;

      if (qq.qType === "MCQ") {
        ok = qq.mcqOptions?.find((o: any) => o._id === ans)?.correct;
        pointsEarned = ok ? qq.points : 0;
      } else if (qq.qType === "TF") {
        ok = ans === qq.tfAnswer;
        pointsEarned = ok ? qq.points : 0;
      } else if (qq.qType === "FIB") {
        const blanks = qq.fibBlanks || [];
        const totalBlanks = blanks.length || 1; // guard against div-by-zero
        const ansObj: FIBVal = (ans as FIBVal) ?? {};

        let numCorrect = 0;
        for (const b of blanks) {
          const userAns = (ansObj[b._id] || "").trim().toLowerCase();
          const answersNormalized = b.answers.map((a: string) =>
            a.trim().toLowerCase()
          );
          if (answersNormalized.includes(userAns)) numCorrect += 1;
        }

        pointsEarned = (qq.points / totalBlanks) * numCorrect;
        ok = numCorrect === totalBlanks;
      }

      score += pointsEarned;
      correct[qq._id] = ok;
    }
    return { score, correct };
  }

  async function submit() {
    if (result || submittedRef.current) return; // guard
    submittedRef.current = true;

    const { score, correct } = scoreQuiz();

    /* ★★★ explicit annotation fixes TS7034 / TS7005 ★★★ */
    let attempt: any;                            // ← type added

    if (preview) {
      attempt = { score, answers, correct, finishedAt: new Date() };
    } else {
      attempt = await api.submitAttempt(qid!, {
        score,
        answers: Object.entries(answers).map(([questionId, value]) => ({
          questionId,
          value,
        })),
      });
      setAttempts((a) => [...a, attempt]);
    }
    setResult({ score, correct, answers });
  }

  /* ── data fetch ───────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      if (!qid) return;
      const qz = await api.getQuiz(qid);
      setQuiz(qz);
      setQuestions(await api.listQuestions(qid));
      if (!preview && currentUser?.role === "STUDENT") {
        setAttempts(await api.listAttempts(qid));
      }
      if (qz?.timeLimit) {
        setTimeLeft(qz.timeLimit * 60); // minutes → seconds
      }
    })();
  }, [qid, preview, currentUser]);

  /* ── timer / auto-submit ─────────────────────────────────── */
  useEffect(() => {
    if (!quiz) return;

    if (timeLeft > 0 && !timerRef.current) {
      timerRef.current = setInterval(
        () => setTimeLeft((t) => Math.max(0, t - 1)),
        1000
      );
      startedRef.current = true;
    }

    /* 3-min and 30-sec warnings – only if quiz NOT yet submitted */
    if (
      !submittedRef.current &&
      !warned3Min.current &&
      timeLeft === 180
    ) {
      window.alert("Only 3 minutes left!");
      warned3Min.current = true;
    }
    if (
      !submittedRef.current &&
      !warned30Sec.current &&
      timeLeft === 30
    ) {
      window.alert("Only 30 seconds left!");
      warned30Sec.current = true;
    }

    /* Auto-submit (with time-up alert) */
    if (startedRef.current && timeLeft === 0 && !submittedRef.current) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      window.alert("Time is up!");
      submit();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timeLeft, quiz]); // submit intentionally NOT in deps

  /* ── derived values & guards ─────────────────────────────── */
  const attemptsLeft =
    quiz && quiz.multipleAttempts
      ? Math.max(0, (quiz.maxAttempts ?? 1) - attempts.length)
      : quiz
      ? attempts.length === 0
        ? 1
        : 0
      : 0;
  const totalAllowed = quiz?.multipleAttempts ? quiz?.maxAttempts ?? 1 : 1;
  const blocked = !preview && attemptsLeft === 0;

  /* ── early exits ─────────────────────────────────────────── */
  if (!quiz || questions.length === 0) return null;

  if (blocked && !result)
    return (
      <div className="p-3">
        <Alert variant="warning">
          You have exhausted all attempts for this quiz.
        </Alert>
        <AttemptSummary
          attempt={attempts[attempts.length - 1]}
          questions={questions}
          quiz={quiz}
          preview={preview}
          currentUser={currentUser}
        />
      </div>
    );

  /* ── UI helpers ──────────────────────────────────────────── */
  const q   = questions[cursor];
  const sel = answers[q._id];

  const fmtTime = (sec: number) =>
    `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

  /* ── submit button handler ──────────────────────────────── */
  const handleFinish = () => {
    const answered = Object.keys(answers).length;
    if (answered !== questions.length) {
      const ok = window.confirm(
        "Some questions are unanswered. Are you sure you want to submit?"
      );
      if (!ok) return;
    }
    submit();
  };

  /* ── results screen ─────────────────────────────────────── */
  if (result)
    return (
      <AttemptSummary
        attempt={result}
        questions={questions}
        quiz={quiz}
        preview={preview}
        currentUser={currentUser}
      />
    );

  /* ── quiz runner screen ─────────────────────────────────── */
  return (
    <div className="p-3">
      <h4 className="d-flex align-items-center flex-wrap">
        <span className="me-auto">{quiz.title}</span>

        {!!quiz.timeLimit && (
          <span
            className={`countdown ${
              timeLeft <= 30 ? "countdown-warning" : ""
            } flex-grow-1 text-center`}
          >
            {fmtTime(timeLeft)}
          </span>
        )}

        {preview ? (
          <Badge bg="secondary" className="ms-auto">
            Faculty Preview
          </Badge>
        ) : (
          <Badge bg="info" className="ms-auto">
            Attempts left: {attemptsLeft}/{totalAllowed}
          </Badge>
        )}
      </h4>

      {quiz.description && (
        <div
          className="mb-3"
          dangerouslySetInnerHTML={{ __html: marked.parse(quiz.description) }}
        />
      )}
      <hr />

      <Card className="mb-3">
        <div className="d-flex justify-content-between align-items-center bg-light px-3 py-2 border-bottom">
          <strong>{q.title}</strong>
          <span className="fw-semibold">{q.points} pts</span>
        </div>

        <Card.Body>
          <div dangerouslySetInnerHTML={{ __html: renderBody(q.body) }} />

          {q.qType === "MCQ" &&
            q.mcqOptions.map((o: any) => (
              <div key={o._id}>
                <input
                  type="radio"
                  name={`mcq_${q._id}`}
                  className="me-2"
                  checked={sel === o._id}
                  onChange={() => recordAnswer(o._id)}
                />{" "}
                {o.text}
              </div>
            ))}

          {q.qType === "TF" &&
            [true, false].map((v, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name={`tf_${q._id}`}
                  className="me-2"
                  checked={sel === v}
                  onChange={() => recordAnswer(v)}
                />{" "}
                {v ? "True" : "False"}
              </div>
            ))}

          {q.qType === "FIB" &&
            (() => {
              const ids: string[] =
                q.fibBlanks?.map((b: any) => b._id) || extractIds(q.body);
              const fibVal: FIBVal = (sel as FIBVal) ?? {};
              return ids.map((id) => (
                <div key={id} className="mb-2">
                  <label className="me-2 fw-semibold">{id}:</label>
                  <input
                    className="form-control d-inline-block w-auto"
                    value={fibVal[id] || ""}
                    onChange={(e) => {
                      const next = { ...fibVal, [id]: e.target.value };
                      recordAnswer(next);
                    }}
                  />
                </div>
              ));
            })()}
        </Card.Body>
      </Card>

      <hr className="my-3" />
      <div className="d-flex justify-content-between align-items-center">
        <Pagination className="mb-0">
          {questions.map((_: any, i: number) => (
            <Pagination.Item
              key={i}
              active={i === cursor}
              onClick={() => setCursor(i)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>

        <Button variant="danger" onClick={handleFinish}>
          {preview ? "Finish Preview" : "Submit Quiz"}
        </Button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Attempt summary screen
──────────────────────────────────────────────────────────────── */
function AttemptSummary({
  attempt,
  questions,
  quiz,
  preview,
  currentUser,
}: {
  attempt: any;
  questions: any[];
  quiz: any;
  preview: boolean;
  currentUser: any;
}) {
  const navigate = useNavigate();
  const { cid } = useParams<{ cid?: string }>();

  const correctMap: Record<string, boolean> =
    attempt.correct ??
    Object.fromEntries(
      (attempt.answers || []).map((a: any) => [a.questionId, a.correct])
    );

  const answerMap: Record<string, Answer> = (() => {
    if (Array.isArray(attempt.answers)) {
      return Object.fromEntries(
        attempt.answers.map((a: any) => [a.questionId, a.value])
      );
    }
    return attempt.answers || {};
  })();

  let showCorrect = true;
  if (!preview && currentUser?.role === "STUDENT") {
    switch (quiz.showCorrect) {
      case "IMMEDIATE":
        break;
      case "AFTER_DUE":
        showCorrect = quiz.dueDate
          ? new Date() > new Date(quiz.dueDate)
          : true;
        break;
      case "NEVER":
      default:
        showCorrect = false;
        break;
    }
  }

  const renderChosen = (q: any): string => {
    const ans = answerMap[q._id];
    if (ans === undefined) return "(no answer)";
    if (q.qType === "MCQ") {
      const opt = q.mcqOptions.find((o: any) => o._id === ans);
      return opt ? opt.text : "(invalid)";
    }
    if (q.qType === "TF") return (ans as boolean) ? "True" : "False";
    if (q.qType === "FIB") {
      const obj = ans as FIBVal;
      return Object.entries(obj)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
    }
    return String(ans);
  };

  const renderCorrect = (q: any): string => {
    if (q.qType === "MCQ") {
      const opt = q.mcqOptions.find((o: any) => o.correct);
      return opt ? opt.text : "";
    }
    if (q.qType === "TF") return q.tfAnswer ? "True" : "False";
    if (q.qType === "FIB") {
      return (q.fibBlanks || [])
        .map((b: any) => `${b._id}: ${b.answers.join(" / ")}`)
        .join(", ");
    }
    return "";
  };

  const totalPoints =
    quiz.points ?? questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="p-3">
      <h3>Your Score: {attempt.score}/{totalPoints}</h3>
      <hr />
      {questions.map((q) => (
        <Card
          key={q._id}
          className="mb-2"
          bg={correctMap[q._id] ? "success" : "danger"}
          text="light"
        >
          <Card.Body>
            <div dangerouslySetInnerHTML={{ __html: renderBody(q.body) }} />
            <ul className="mb-0">
              <li>
                <strong>Your answer:</strong> {renderChosen(q)}
              </li>
              {showCorrect && (
                <li>
                  <strong>Correct answer:</strong> {renderCorrect(q)}
                </li>
              )}
            </ul>
          </Card.Body>
        </Card>
      ))}

      <hr />
      <div className="text-end">
        <Button
          variant="secondary"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
        >
          Close
        </Button>
      </div>
    </div>
  );
}
