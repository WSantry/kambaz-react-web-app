/* ──────────────────────────────────────────────────────────────
   File: src/Kambaz/Courses/Quizzes/Questions.tsx  (UPDATED)
──────────────────────────────────────────────────────────────── */
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav, ListGroup, Button, Spinner } from "react-bootstrap";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";

import * as api from "./client";
import {
  setQuestions,
  addQuestion,
  deleteQuestion,
  updateQuiz,
  clearDraftQuiz,
} from "./reducer";

export default function QuizQuestions() {
  /* ── routing / redux ─ */
  const { cid, qid } = useParams<{ cid?: string; qid?: string }>();
  const navigate = useNavigate();
  const dispatch  = useDispatch();
  const { questions, draftQuiz } = useSelector((s: any) => s.quizzesReducer);

  /* ── fetch ─ */
  useEffect(() => {
    (async () => {
      if (!qid) return;
      dispatch(setQuestions(await api.listQuestions(qid)));
    })();
  }, [qid, dispatch]);

  /* ── helpers ─ */
  const inactive = (tab: "DETAILS" | "QUESTIONS") =>
    tab === "QUESTIONS" ? "" : "text-danger";

  const addNew = async () => {
    if (!qid) return;
    const q = await api.createQuestion(qid, {
      title: "New Question",
      qType: "MCQ",
      points: 1,
      body: "",
      mcqOptions: [
        { _id: "opt1", text: "", correct: true },
        { _id: "opt2", text: "", correct: false },
      ],
    });
    dispatch(addQuestion(q));
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/questions/${q._id}`);
  };

  const remove = async (id: string) => {
    if (!qid) return;
    if (!window.confirm("Delete question?")) return;
    await api.deleteQuestion(qid, id);
    dispatch(deleteQuestion(id));
  };

  const totalPts     = questions.reduce((sum: number, q: any) => sum + (q.points ?? 0), 0);
  const numQuestions = questions.length;

  /* ---------- save / publish logic (uses draft) -------------- */
  const saveQuiz = async (publish: boolean) => {
    if (!qid) return;

    // Use draft if it matches this quiz, otherwise minimal object
    const base =
      draftQuiz && draftQuiz._id === qid ? draftQuiz : { _id: qid };

    const payload = {
      ...base,
      points: totalPts,
      questionsCount: numQuestions,     // ★ NEW – keep list in sync
      published: publish,
    };

    await api.updateQuiz(payload);
    dispatch(updateQuiz(payload));
    dispatch(clearDraftQuiz()); // draft consumed

    navigate(
      publish
        ? `/Kambaz/Courses/${cid}/Quizzes`
        : `/Kambaz/Courses/${cid}/Quizzes/${qid}`
    );
  };
  /* ----------------------------------------------------------- */

  /* ── UI ─ */
  if (!qid)       return <p className="m-3 text-danger">Bad Quiz ID</p>;
  if (!questions) return <Spinner className="m-3" />;

  return (
    <div className="p-3">
      {/* ── tab bar (same as editor) ─ */}
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

      {/* ── header row ─ */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Points:&nbsp;{totalPts}</h4>
        <Button variant="danger" onClick={addNew}>
          <FaPlus className="me-1" />
          New&nbsp;Question
        </Button>
      </div>

      {/* make top hr’s bottom gap = bottom hr’s top gap */}
      <hr className="mt-4 mb-4" />

      {/* list or empty state, both with zero margins */}
      {questions.length === 0 ? (
        <p className="text-muted m-0">
          No questions yet – click <b>New Question</b> to start.
        </p>
      ) : (
        <div className="quiz-question-list m-0">
          <ListGroup>
            {questions.map((q: any) => (
              <ListGroup.Item
                key={q._id}
                className="d-flex align-items-center"
              >
                <div className="flex-fill">
                  <b>{q.title || "(untitled)"}</b> — {q.qType} • {q.points} pts
                </div>

                <Button
                  as={Link as any}
                  to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/questions/${q._id}`}
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  title="Edit"
                >
                  <FaPencilAlt />
                </Button>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => remove(q._id)}
                  title="Delete"
                >
                  <FaTrash />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}

      {/* bottom controls */}
      <hr className="mt-4" />
      <div className="text-end">
        <Button
          variant="secondary"
          className="me-2"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          className="me-2"
          onClick={() => saveQuiz(false)}
        >
          Save
        </Button>
        <Button variant="success" onClick={() => saveQuiz(true)}>
          Save&nbsp;&amp;&nbsp;Publish
        </Button>
      </div>
    </div>
  );
}
