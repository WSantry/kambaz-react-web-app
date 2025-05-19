import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

export default function CourseNavigation() {
  const location = useLocation();

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      <Link
        to="/Kambaz/Courses/1234/Home"
        id="wd-course-home-link"
        className={`list-group-item border-0 ${location.pathname === "/Kambaz/Courses/1234/Home" ? "active" : "text-danger"}`}
      >
        Home
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Modules"
        id="wd-course-modules-link"
        className={`list-group-item border-0 ${location.pathname === "/Kambaz/Courses/1234/Modules" ? "active" : "text-danger"}`}
      >
        Modules
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Piazza"
        id="wd-course-piazza-link"
        className={`list-group-item border-0 ${location.pathname === "/Kambaz/Courses/1234/Piazza" ? "active" : "text-danger"}`}
      >
        Piazza
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Zoom"
        id="wd-course-zoom-link"
        className={`list-group-item border-0 ${location.pathname === "/Kambaz/Courses/1234/Zoom" ? "active" : "text-danger"}`}
      >
        Zoom Meetings
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Assignments"
        id="wd-course-assignments-link"
        className={`list-group-item border-0 ${location.pathname === "/Kambaz/Courses/1234/Assignments" ? "active" : "text-danger"}`}
      >
        Assignments
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Quizzes"
        id="wd-course-quizzes-link"
        className={`list-group-item border-0 ${location.pathname === "/Kambaz/Courses/1234/Quizzes" ? "active" : "text-danger"}`}
      >
        Quizzes
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Grades"
        id="wd-course-grades-link"
        className={`list-group-item border-0 ${location.pathname === "/Kambaz/Courses/1234/Grades" ? "active" : "text-danger"}`}
      >
        Grades
      </Link>
      <Link
        to="/Kambaz/Courses/1234/People"
        id="wd-course-people-link"
        className={`list-group-item border-0 ${location.pathname === "/Kambaz/Courses/1234/People" ? "active" : "text-danger"}`}
      >
        People
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Settings"
        id="wd-course-settings-link"
        className={`list-group-item border-0 ${location.pathname === "/Kambaz/Courses/1234/Settings" ? "active" : "text-danger"}`}
      >
        Settings
      </Link>
    </div>
  );
}
