// File: src/Kambaz/Courses/Assignments/index.tsx
import { useParams, Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { assignments } from "../../Database";

import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaFilePen } from "react-icons/fa6";

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
  // "May 13, 11:59 PM" => "May 13 at 11:59 pm"
  return date
    .toLocaleString("en-US", options)
    .replace(",", " at")
    .replace(/\s([AP]M)$/, (m) => m.toLowerCase());
}

export default function Assignments() {
  const { cid } = useParams();
  const filtered = assignments.filter(a => a.course === cid);

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
            {filtered.map(assn => (
              <ListGroup.Item
                key={assn._id}
                className="wd-lesson p-3 ps-1 d-flex align-items-center"
              >
                <BsGripVertical className="me-2 fs-3" />
                <FaFilePen className="me-3 text-success" />
                <div className="flex-fill">
                  <Link
                    to={`/Kambaz/Courses/${cid}/Assignments/${assn._id}`}
                    className="fw-bold text-decoration-none text-dark"
                  >
                    {assn.title}
                  </Link>
                  <br />
                  <small className="text-muted">
                    <span className="text-danger">Multiple Modules</span>&nbsp;|&nbsp;
                    <b>Not available until</b>  {formatDate(assn.availableDate ?? "")}&nbsp;|&nbsp;
                    <b>Due</b> {formatDate(assn.dueDate ?? "")} | {assn.points} pts
                  </small>
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
