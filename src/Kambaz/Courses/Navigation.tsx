import { Link, useLocation, useParams } from "react-router-dom";
import "./Navigation.css";

export default function CourseNavigation() {
  const location = useLocation();
  const { cid } = useParams();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
    "Settings"
  ];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map(label => {
        const url = `/Kambaz/Courses/${cid}/${label}`;
        const active = location.pathname === url || location.pathname === url + "/";

        return (
          <Link
            key={label}
            to={url}
            className={`list-group-item border-0 ${
              active ? "active" : "text-danger"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}