import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import "./Assignments.css";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      {/* 1) Row with search on left, 2 buttons on right */}
      <div className="d-flex mb-3 align-items-center">
        <div className="me-auto d-flex align-items-center">
          <FaSearch className="me-2 text-secondary" />
          <Form.Control type="text" placeholder="Search for Assignments" className="me-2" />
        </div>
        <Button variant="secondary" className="me-2 d-flex align-items-center">
          <FaPlus className="me-1" />
          Group
        </Button>
        <Button variant="danger" className="d-flex align-items-center">
          <FaPlus className="me-1" />
          Assignment
        </Button>
      </div>

      {/* 2) Example assignment group header */}
      <h3 className="d-flex align-items-center">
        ASSIGNMENTS <span className="ms-2 text-muted">40% of Total</span>
        <Button variant="danger" size="sm" className="ms-2">
          <FaPlus />
        </Button>
      </h3>

      <ul className="list-unstyled mt-4">
        <li className="wd-assignment-list-item p-3 mb-2">
          <Link to="/Kambaz/Courses/1234/Assignments/123" className="fw-bold text-decoration-none text-dark">
            A1 - ENV + HTML
          </Link>
          <br />
          <small className="text-muted">
            Multiple Modules | <b>Not available until</b> May 6 at 12:00am |
            <b> Due</b> May 13 at 11:59pm | 100 points
          </small>
        </li>
        <li className="wd-assignment-list-item p-3 mb-2">
          <Link to="/Kambaz/Courses/1234/Assignments/234" className="fw-bold text-decoration-none text-dark">
            A2 - CSS & Layout
          </Link>
          <br />
          <small className="text-muted">
            Multiple Modules | <b>Not available until</b> May 13 at 12:00am |
            <b> Due</b> May 20 at 11:59pm | 100 points
          </small>
        </li>
        <li className="wd-assignment-list-item p-3 mb-2">
          <Link to="/Kambaz/Courses/1234/Assignments/345" className="fw-bold text-decoration-none text-dark">
            A3 - JavaScript
          </Link>
          <br />
          <small className="text-muted">
            Multiple Modules | <b>Not available until</b> May 20 at 12:00am |
            <b> Due</b> May 27 at 11:59pm | 100 points
          </small>
        </li>
      </ul>
    </div>
  );
}
