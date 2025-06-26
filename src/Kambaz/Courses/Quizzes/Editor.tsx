/* ──────────────────────────────────────────────────────────────
   File: src/Kambaz/Courses/Quizzes/Editor.tsx
──────────────────────────────────────────────────────────────── */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Button,
  Nav,
  Alert,
  Card,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as api from "./client";
import {
  addQuiz,
  updateQuiz,
  setDraftQuiz,
  updateDraftQuiz,
  clearDraftQuiz,
} from "./reducer";

/* ── types ──────────────────────────────────────────────────── */
type QuizForm = {
  _id: string;                             // ← NOW REQUIRED
  title: string;
  description: string;
  points: number;
  quizType: "GRADED" | "PRACTICE" | "G_SURVEY" | "U_SURVEY";
  assignmentGroup: "Quizzes" | "Exams" | "Assignments" | "Project";
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  maxAttempts: number;
  showCorrect: "IMMEDIATE" | "AFTER_DUE" | "NEVER";
  accessCode: string;
  oneQPerTime: boolean;
  webcamRequired: boolean;
  lockAfterAnswer: boolean;
  dueDate: string;
  availableDate: string;
  untilDate: string;
};

/* ── helpers ────────────────────────────────────────────────── */
const fmtLocal = (d: Date) => d.toISOString().slice(0, 16);
const toLocal = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  const ms = d.getTime() - d.getTimezoneOffset() * 60_000;
  return new Date(ms).toISOString().slice(0, 16);
};
const toISO = (local: string) =>
  local ? new Date(local).toISOString() : "";

const defaultDates = () => {
  const now = new Date();
  const due = new Date(now);
  due.setDate(due.getDate() + 7);
  return {
    availableDate: fmtLocal(now),
    dueDate: fmtLocal(due),
    untilDate: fmtLocal(due),
  };
};

const INITIAL_QUIZ: QuizForm = {
  _id: "draft",                            // overwritten later
  title: "New Quiz",
  description: "",
  points: 0,
  quizType: "GRADED",
  assignmentGroup: "Quizzes",
  shuffleAnswers: true,
  timeLimit: 20,
  multipleAttempts: false,
  maxAttempts: 1,
  showCorrect: "IMMEDIATE",
  accessCode: "",
  oneQPerTime: true,
  webcamRequired: false,
  lockAfterAnswer: false,
  ...defaultDates(),
};

/* ── component ──────────────────────────────────────────────── */
export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tab, setTab] = useState<"DETAILS" | "QUESTIONS">("DETAILS");
  const [quiz, setQuiz] = useState<QuizForm>(INITIAL_QUIZ);
  const [error, setError] = useState<string | null>(null);

  /* fetch existing (or initialise new) */
  useEffect(() => {
    (async () => {
      if (qid && qid !== "new") {
        const data = await api.getQuiz(qid);
        const fullQuiz: QuizForm = {
          ...INITIAL_QUIZ,
          ...data,
          _id: data._id,                    // ensure required
          availableDate: toLocal(data.availableDate),
          dueDate: toLocal(data.dueDate),
          untilDate: toLocal(data.untilDate),
        };
        setQuiz(fullQuiz);
        dispatch(setDraftQuiz(fullQuiz));   // ✅ no TS error now
      } else {
        dispatch(
          setDraftQuiz({ ...INITIAL_QUIZ, _id: qid || "new" })
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid]);

  /* setter – keeps local UI & redux draft in sync */
  const handle = <K extends keyof QuizForm>(k: K, v: QuizForm[K]) =>
    setQuiz((prev) => {
      const updated = { ...prev, [k]: v };
      dispatch(updateDraftQuiz({ [k]: v }));
      return updated;
    });

  /* date validation */
  const validateDates = () => {
    const avail = quiz.availableDate && new Date(quiz.availableDate);
    const until = quiz.untilDate && new Date(quiz.untilDate);
    const due =
      quiz.dueDate && quiz.dueDate !== "" ? new Date(quiz.dueDate) : null;

    if (avail && until && avail >= until) {
      return "“Available From” must be before “Until”.";
    }
    if (due && avail && avail >= due) {
      return "“Available From” must be before “Due”.";
    }
    return null;
  };

  /* save */
  const save = async (publish: boolean) => {
    const err = validateDates();
    if (err) {
      setError(err);
      return;
    }
    setError(null);

    const payload = {
      ...quiz,
      published: publish,
      availableDate: toISO(quiz.availableDate),
      dueDate: toISO(quiz.dueDate),
      untilDate: toISO(quiz.untilDate),
    };

    let saved;
    if (qid === "new") {
      saved = await api.createQuiz(cid!, payload);
      dispatch(addQuiz(saved));
    } else {
      saved = { ...payload, _id: qid as string };
      await api.updateQuiz(saved);
      dispatch(updateQuiz(saved));
    }

    dispatch(clearDraftQuiz());
    navigate(
      publish
        ? `/Kambaz/Courses/${cid}/Quizzes`
        : `/Kambaz/Courses/${cid}/Quizzes/${saved._id}`
    );
  };

  /* ── UI helpers ─ */
  const inactive = (k: "DETAILS" | "QUESTIONS") =>
    k === tab ? "" : "text-danger";

  /* ── render ──────────────────────────────────────────────── */
  return (
    <div className="p-3">
      {/* Tabs */}
      <Nav variant="tabs" activeKey={tab} onSelect={(k) => setTab(k as any)}>
        <Nav.Item>
          <Nav.Link
            eventKey="DETAILS"
            className={inactive("DETAILS")}
            as={Link as any}
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="QUESTIONS"
            className={inactive("QUESTIONS")}
            as={Link as any}
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/questions`}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <br />

      {/* Error banner */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {tab === "DETAILS" && (
        <>
          {/* ───────────────────────────────────────── DETAILS FORM ─ */}
          <Form>
            {/* Title & description */}
            <Form.Group className="mb-3">
              <Form.Label>Quiz Title</Form.Label>
              <Form.Control
                value={quiz.title}
                onChange={(e) => handle("title", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Quiz Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={quiz.description}
                onChange={(e) => handle("description", e.target.value)}
              />
            </Form.Group>

            {/* First meta row */}
            <Row className="mb-4">
              <Col md={4}>
                <Form.Label>Quiz Type</Form.Label>
                <Form.Select
                  value={quiz.quizType}
                  onChange={(e) =>
                    handle("quizType", e.target.value as QuizForm["quizType"])
                  }
                >
                  <option value="GRADED">Graded Quiz</option>
                  <option value="PRACTICE">Practice Quiz</option>
                  <option value="G_SURVEY">Graded Survey</option>
                  <option value="U_SURVEY">Ungraded Survey</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select
                  value={quiz.assignmentGroup}
                  onChange={(e) =>
                    handle(
                      "assignmentGroup",
                      e.target.value as QuizForm["assignmentGroup"]
                    )
                  }
                >
                  <option value="Quizzes">Quizzes</option>
                  <option value="Exams">Exams</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Project">Project</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label>Points</Form.Label>
                <Form.Control value={quiz.points} readOnly disabled />
              </Col>
            </Row>

            {/* OPTIONS – indented with offset=4 */}
            <Row>
              <Col md={{ offset: 4, span: 8 }}>
                <h5 className="fw-semibold">Options</h5>

                <Form.Check
                  type="checkbox"
                  label="Shuffle Answers"
                  className="mb-2"
                  checked={quiz.shuffleAnswers}
                  onChange={(e) => handle("shuffleAnswers", e.target.checked)}
                />

                {/* Time limit row */}
                <div className="d-flex align-items-center mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Time Limit"
                    checked={quiz.timeLimit > 0}
                    onChange={(e) =>
                      handle("timeLimit", e.target.checked ? 20 : 0)
                    }
                    className="me-2"
                  />
                  <Form.Control
                    type="number"
                    min={1}
                    style={{ maxWidth: 90 }}
                    disabled={quiz.timeLimit === 0}
                    value={quiz.timeLimit === 0 ? "" : quiz.timeLimit}
                    onChange={(e) =>
                      handle("timeLimit", Number(e.target.value) || 0)
                    }
                  />
                </div>

                <Form.Check
                  type="checkbox"
                  label="Allow Multiple Attempts"
                  checked={quiz.multipleAttempts}
                  onChange={(e) => handle("multipleAttempts", e.target.checked)}
                  className="mb-2"
                />
                {quiz.multipleAttempts && (
                  <div className="d-flex align-items-center mb-3 ms-3">
                    <Form.Label className="mb-0 me-2">
                      How Many Attempts
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      style={{ maxWidth: 90 }}
                      value={quiz.maxAttempts}
                      onChange={(e) =>
                        handle("maxAttempts", Number(e.target.value) || 1)
                      }
                    />
                  </div>
                )}

                <Form.Check
                  type="checkbox"
                  label="One Question at a Time"
                  checked={quiz.oneQPerTime}
                  onChange={(e) => handle("oneQPerTime", e.target.checked)}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Webcam Required"
                  checked={quiz.webcamRequired}
                  onChange={(e) => handle("webcamRequired", e.target.checked)}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  label="Lock Questions After Answering"
                  checked={quiz.lockAfterAnswer}
                  onChange={(e) => handle("lockAfterAnswer", e.target.checked)}
                  className="mb-4"
                />

                {/* Show correct answers (row) */}
                <Form.Group className="mb-3">
                  <Form.Label>Show Correct Answers</Form.Label>
                  <Form.Select
                    style={{ maxWidth: 260 }}
                    value={quiz.showCorrect}
                    onChange={(e) =>
                      handle(
                        "showCorrect",
                        e.target.value as typeof quiz.showCorrect
                      )
                    }
                  >
                    <option value="IMMEDIATE">Immediately</option>
                    <option value="AFTER_DUE">After Due Date</option>
                    <option value="NEVER">Never</option>
                  </Form.Select>
                </Form.Group>

                {/* Access code (row) */}
                <Form.Group className="mb-4">
                  <Form.Label>Access Code</Form.Label>
                  <Form.Control
                    style={{ maxWidth: 260 }}
                    value={quiz.accessCode}
                    onChange={(e) => handle("accessCode", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* END OPTIONS */}

            {/* Assign dates */}
            <Card className="mb-4">
              <Card.Body>
                <h5 className="fw-semibold mb-3">Assign</h5>
                <Row>
                  <Col md={4}>
                    <Form.Label className="fw-bold">Due</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.dueDate}
                      onChange={(e) => {
                        const v = e.target.value;
                        handle("dueDate", v);
                        handle("untilDate", v);
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label className="fw-bold">Available From</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.availableDate}
                      onChange={(e) => handle("availableDate", e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label className="fw-bold">Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.untilDate}
                      onChange={(e) => handle("untilDate", e.target.value)}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Form>
          {/* ─────────────────────────────────────── END DETAILS FORM ─ */}

          <hr className="mt-4" />
          {/* action buttons */}
          <div className="text-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
            >
              Cancel
            </Button>
            <Button variant="danger" className="me-2" onClick={() => save(false)}>
              Save
            </Button>
            <Button variant="success" onClick={() => save(true)}>
              Save&nbsp;&amp;&nbsp;Publish
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
