// src/Kambaz/Courses/Quizzes/Details.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Spinner, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as api from "./client";
import { updateQuiz } from "./reducer";

/* ── helpers ──────────────────────────────────────────── */
const yesNo = (v?: boolean) => (v ? "Yes" : "No");

const QUIZ_TYPE: Record<string, string> = {
  GRADED: "Graded Quiz",
  PRACTICE: "Practice Quiz",
  G_SURVEY: "Graded Survey",
  U_SURVEY: "Ungraded Survey",
};

const SHOW_CORRECT: Record<string, string> = {
  IMMEDIATE: "Immediately",
  AFTER_DUE: "After Due",
  NEVER: "Never",
};

const fmtDateTime = (d?: string) => {
  if (!d) return "—";
  const dt = new Date(d);
  const date = dt.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const time = dt
    .toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    })
    .toLowerCase();
  return `${date} at ${time}`;
};

/* ── component ────────────────────────────────────────── */
export default function QuizDetails() {
  const { qid } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (s: any) => s.accountReducer
  );
  const [quiz, setQuiz] = useState<any>(null);

  /* fetch */
  useEffect(() => {
    if (!qid) return;
    (async () => setQuiz(await api.getQuiz(qid)))();
  }, [qid]);

  /* publish toggle */
  const togglePublish = async () => {
    if (!quiz) return;
    const updated = { ...quiz, published: !quiz.published };
    await api.publishQuiz(updated._id, updated.published);
    setQuiz(updated);
    dispatch(updateQuiz(updated));
  };

  if (!quiz) return <Spinner className="m-3" />;

  /* rows – only required props */
  const rows: [string, string | number][] = [
    ["Quiz Type", QUIZ_TYPE[quiz.quizType]],
    ["Points", quiz.points ?? 0],
    ["Assignment Group", quiz.assignmentGroup],
    ["Shuffle Answers", yesNo(quiz.shuffleAnswers)],
    [
      "Time Limit",
      quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "None",
    ],
    ["Multiple Attempts", yesNo(quiz.multipleAttempts)],
    // ↙↙ ALWAYS show the value stored (or default 1)  ↙↙
    ["How Many Attempts", quiz.maxAttempts ?? 1],
    ["Show Correct Answers", SHOW_CORRECT[quiz.showCorrect]],
    ["Access Code", quiz.accessCode || "—"],
    ["One Question at a Time", yesNo(quiz.oneQPerTime)],
    ["Webcam Required", yesNo(quiz.webcamRequired)],
    [
      "Lock Questions After Answering",
      yesNo(quiz.lockAfterAnswer),
    ],
  ];

  /* ── render ─────────────────────────────────────────── */
  return (
    <div className="p-3">
      {/* centred top buttons */}
      {currentUser?.role === "FACULTY" && (
        <div className="text-center mb-3">
          <Button
            variant={quiz.published ? "warning" : "success"}
            onClick={togglePublish}
            className="me-2"
          >
            {quiz.published ? "Unpublish" : "Publish"}
          </Button>
          <Button
            as={Link as any}
            to="preview"
            variant="outline-secondary"
            className="me-2"
          >
            Preview
          </Button>
          <Button
            as={Link as any}
            to="edit"
            variant="outline-secondary"
          >
            Edit
          </Button>
        </div>
      )}

      {/* dotted panel */}
      <div
        className="p-4 mb-3"
        style={{ border: "1px dashed #c0c0c0" }}
      >
        <h4 className="fw-bold mb-4">{quiz.title}</h4>

        {/* property list – left aligned */}
        <Table borderless size="sm" className="w-auto">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}>
                <td className="pe-3 fw-semibold text-end">{k}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* schedule table with top & bottom grey rules */}
        <Table borderless size="sm" className="mt-4 w-100">
          <thead>
            <tr>
              {["Due", "For", "Available from", "Until"].map(
                (label) => (
                  <th
                    key={label}
                    className="fw-semibold"
                    style={{
                      borderBottom: "1px solid #adb5bd",
                      paddingBottom: "0.25rem",
                    }}
                  >
                    {label}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{ borderBottom: "1px solid #adb5bd" }}
              >
                {fmtDateTime(quiz.dueDate)}
              </td>
              <td
                style={{ borderBottom: "1px solid #adb5bd" }}
              >
                Everyone
              </td>
              <td
                style={{ borderBottom: "1px solid #adb5bd" }}
              >
                {fmtDateTime(quiz.availableDate)}
              </td>
              <td
                style={{ borderBottom: "1px solid #adb5bd" }}
              >
                {fmtDateTime(quiz.untilDate)}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* student CTA */}
      {currentUser?.role === "STUDENT" && quiz.published && (
        <div className="text-center">
          <Button as={Link as any} to="take" variant="primary">
            Start Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
