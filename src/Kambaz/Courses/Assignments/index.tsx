import { Link } from "react-router-dom";
import {ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";

import "./Assignments.css";
import { FaFileSignature } from "react-icons/fa6";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      {/* 1) top bar: search + buttons */}
      <AssignmentControls />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          {/* group header */}
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <b>ASSIGNMENTS</b>
            <AssignmentControlButtons />
          </div>

          {/* lesson rows */}
          <ListGroup className="wd-lessons rounded-0">
            {/* A1 */}
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileSignature className="me-3 text-success" />

              <div className="flex-fill">
                <Link
                  to="/Kambaz/Courses/1234/Assignments/123"
                  className="fw-bold text-decoration-none text-dark"
                >
                  A1
                </Link>
                <br />
                <small className="text-muted">
                  <span className="text-danger">Multiple Modules</span>&nbsp; |&nbsp;
                  <b>Not available until</b> May&nbsp;6&nbsp;at&nbsp;12:00&nbsp;am&nbsp; |&nbsp;
                  <b>Due</b> May&nbsp;13&nbsp;at&nbsp;11:59&nbsp;pm&nbsp; |&nbsp;100&nbsp;pts
                </small>
              </div>

              <LessonControlButtons />
            </ListGroup.Item>

            {/* A2 */}
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileSignature className="me-3 text-success" />

              <div className="flex-fill">
                <Link
                  to="/Kambaz/Courses/1234/Assignments/234"
                  className="fw-bold text-decoration-none text-dark"
                >
                  A2
                </Link>
                <br />
                <small className="text-muted">
                  <span className="text-danger">Multiple Modules</span>&nbsp; |&nbsp;
                  <b>Not available until</b> May&nbsp;13&nbsp;at&nbsp;12:00&nbsp;am&nbsp; |&nbsp;
                  <b>Due</b> May&nbsp;20&nbsp;at&nbsp;11:59&nbsp;pm&nbsp; |&nbsp;100&nbsp;pts
                </small>
              </div>

              <LessonControlButtons />
            </ListGroup.Item>

            {/* A3 */}
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaFileSignature className="me-3 text-success" />

              <div className="flex-fill">
                <Link
                  to="/Kambaz/Courses/1234/Assignments/345"
                  className="fw-bold text-decoration-none text-dark"
                >
                  A3
                </Link>
                <br />
                <small className="text-muted">
                  <span className="text-danger">Multiple Modules</span>&nbsp; |&nbsp;
                  <b>Not available until</b> May&nbsp;20&nbsp;at&nbsp;12:00&nbsp;am&nbsp; |&nbsp;
                  <b>Due</b> May&nbsp;27&nbsp;at&nbsp;11:59&nbsp;pm&nbsp; |&nbsp;100&nbsp;pts
                </small>
              </div>

              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
