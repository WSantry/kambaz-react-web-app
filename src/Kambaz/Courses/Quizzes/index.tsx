// src/Kambaz/Courses/Quizzes/index.tsx
import { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ListGroup,
  Button,
  Form,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FaPlus,
  FaCheckCircle,
  FaRocket,
  FaEllipsisV,
} from "react-icons/fa";

import * as api from "./client";
import { setQuizzes, addQuiz, deleteQuiz, updateQuiz } from "./reducer";

/** Format "Mon D at H:MM am/pm" */
function fmtDateTime(d: string = ""): string {
  if (!d) return "";
  const date = new Date(d);
  const datePart = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const timePart = date
    .toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" })
    .toLowerCase();
  return `${datePart} at ${timePart}`;
}

export default function Quizzes() {
  const { cid } = useParams<{ cid?: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizzes: any[] = useSelector((s: any) => s.quizzesReducer.quizzes);
  const currentUser: any = useSelector((s: any) => s.accountReducer.currentUser);

  const [search, setSearch] = useState("");

  // Fetch & sort when course changes
  useEffect(() => {
    (async () => {
      if (!cid) return;
      const list = await api.listQuizzes(cid);
      list.sort(
        (a: any, b: any) =>
          new Date(a.availableDate || 0).getTime() -
          new Date(b.availableDate || 0).getTime()
      );
      dispatch(setQuizzes(list));
    })();
  }, [cid, dispatch]);

  // Handlers
  const handleAdd = async () => {
    const q = await api.createQuiz(cid!, {});
    dispatch(addQuiz(q));
    navigate(`${q._id}/edit`);
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete quiz?")) return;
    await api.deleteQuiz(id);
    dispatch(deleteQuiz(id));
  };
  const handleTogglePublish = async (q: any) => {
    const updated = { ...q, published: !q.published };
    await api.publishQuiz(q._id, updated.published);
    dispatch(updateQuiz(updated));
  };

  // Filter & sort
  const filtered = quizzes
    .filter((q) => q.title.toLowerCase().includes(search.toLowerCase()))
    .sort(
      (a, b) =>
        new Date(a.availableDate || a.updatedAt || 0).getTime() -
        new Date(b.availableDate || b.updatedAt || 0).getTime()
    );

  // Group by assignmentGroup
  const groups: Record<string, any[]> = filtered.reduce((acc, q) => {
    const key = q.assignmentGroup || "Quizzes";
    if (!acc[key]) acc[key] = [];
    acc[key].push(q);
    return acc;
  }, {} as Record<string, any[]>);

  // Group display names
  const groupDisplay: Record<string, string> = {
    Quizzes: "Assignment Quizzes",
    Exams: "Exams",
    Assignments: "Assignments",
    Project: "Project",
  };

  return (
    <div className="p-3">
      {/* Search + Add */}
      <div className="d-flex align-items-center justify-content-between">
        <InputGroup style={{ maxWidth: 300 }}>
          <Form.Control
            placeholder="Search for Quiz"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        {currentUser?.role === "FACULTY" && (
          <Button variant="danger" onClick={handleAdd}>
            <FaPlus className="me-1" /> Quiz
          </Button>
        )}
      </div>

      {/* horizontal rule */}
      <hr className="my-3" />

      {/* Empty state */}
      {filtered.length === 0 ? (
        <p className="text-muted">
          No quizzes yet – click <b>+ Quiz</b> to create one.
        </p>
      ) : (
        <div className="wd-lesson border rounded">
          <ListGroup className="border-0 rounded-0">
            {Object.entries(groups).map(([groupKey, qs]) => {
              const header = groupDisplay[groupKey] || groupKey;
              return (
                <div key={groupKey}>
                  {/* Group header */}
                  <div className="bg-secondary border-bottom p-3 fw-bold">
                    {header}
                  </div>
                  {qs.map((q: any) => {
                    const now = new Date();
                    const avail = q.availableDate
                      ? new Date(q.availableDate)
                      : null;
                    const until = q.untilDate
                      ? new Date(q.untilDate)
                      : null;

                    // Status prefix & detail
                    let statusPrefix: string;
                    let statusDetail = "";
                    if (avail && avail > now) {
                      statusPrefix = "Not available until";
                      statusDetail = fmtDateTime(q.availableDate);
                    } else if (until && until < now) {
                      statusPrefix = "Closed";
                    } else {
                      statusPrefix = "Available";
                    }

                    return (
                      <ListGroup.Item
                        key={q._id}
                        className="wd-lesson d-flex align-items-center"
                        style={{
                          border: "none",
                          borderBottom: "1px solid #e0e0e0",
                          padding: "0.75rem 1rem",
                          overflow: "visible",
                        }}
                      >
                        {/* Icon */}
                        <FaRocket
                          style={{
                            color: "#28a745",
                            fontSize: "1.25rem",
                            marginRight: "1rem",
                          }}
                        />

                        {/* Title & meta */}
                        <div className="flex-fill">
                          <Link
                            to={`${q._id}`}
                            className="fw-bold text-dark text-decoration-none"
                          >
                            {q.title}
                          </Link>
                          <br />
                          <small>
                            <strong className="text-muted">
                              {statusPrefix}
                            </strong>
                            {statusDetail && <> {statusDetail}</>}
                            <span className="text-muted"> | </span>
                            <strong className="text-muted">Due</strong>{" "}
                            {fmtDateTime(q.dueDate)}
                            <span className="text-muted"> | </span>
                            {q.points} pts
                            <span className="text-muted"> | </span>
                            {q.questionsCount || 0} Questions
                          </small>
                        </div>

                        {currentUser?.role === "FACULTY" && (
                          <>
                            {/* Check icon */}
                            <span
                              onClick={() => handleTogglePublish(q)}
                              style={{
                                cursor: "pointer",
                                fontSize: "1.25rem",
                                marginRight: "1rem",
                                color: "#28a745",
                                opacity: q.published ? 1 : 0.3,
                              }}
                            >
                              <FaCheckCircle />
                            </span>

                            {/* Dropdown */}
                            <Dropdown align="end">
                              <Dropdown.Toggle
                                as={forwardRef<HTMLDivElement, any>(
                                  ({ onClick }, ref) => (
                                    <div
                                      ref={ref}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        onClick(e);
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <FaEllipsisV className="fs-5" />
                                    </div>
                                  )
                                )}
                                id={`quiz-menu-${q._id}`}
                              />
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  as={Link}
                                  to={`${q._id}/edit`}
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => handleDelete(q._id)}
                                >
                                  Delete
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleTogglePublish(q)
                                  }
                                >
                                  {q.published
                                    ? "Unpublish"
                                    : "Publish"}
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </>
                        )}
                      </ListGroup.Item>
                    );
                  })}
                </div>
              );
            })}
          </ListGroup>
        </div>
      )}
    </div>
  );
}
