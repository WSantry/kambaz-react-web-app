// File: src/Kambaz/Courses/Assignments/index.tsx
import { useParams, Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaFilePen, FaTrash } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

function formatDate(isoString: string) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return date
    .toLocaleString("en-US", options)
    .replace(",", " at")
    .replace(/\s([AP]M)$/, (m) => m.toLowerCase());
}

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Filter to only the assignments for the current course
  const filtered = assignments.filter((a: any) => a.course === cid);

  // Handler for deletion
  const handleDelete = (assignmentId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div id="wd-assignments" className="p-3">
      {/* 1) top bar: search + buttons */}
      <AssignmentControls />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          {/* group header */}
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <b>ASSIGNMENTS</b>
            <AssignmentControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {filtered.map((assn: any) => (
              <ListGroup.Item
                key={assn._id}
                className="wd-lesson p-3 ps-1 d-flex align-items-center"
              >
                <BsGripVertical className="me-2 fs-3" />
                <FaFilePen className="me-3 text-success" />
                <div className="flex-fill">
                  {/* Link to editing (not 'new') */}
                  <Link
                    to={`/Kambaz/Courses/${cid}/Assignments/${assn._id}`}
                    className="fw-bold text-decoration-none text-dark"
                  >
                    {assn.title}
                  </Link>
                  <br />
                  <small className="text-muted">
                    <span className="text-danger">Multiple Modules</span>&nbsp;|&nbsp;
                    <b>Not available until</b>{" "}
                    {formatDate(assn.availableDate ?? "")}&nbsp;|&nbsp;
                    <b>Due</b> {formatDate(assn.dueDate ?? "")} | {assn.points} pts
                  </small>
                </div>

                {/* Optional controls: Student see or not? */}
                {currentUser.role === "FACULTY" && (
                  <div className="d-flex align-items-center">
                    <FaTrash
                      className="text-danger me-1 fs-4"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(assn._id)}
                    />
                    <LessonControlButtons />
                  </div>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
