import { Link, useLocation, useParams } from "react-router-dom";
import "./Navigation.css";

export default function CourseNavigation() {
  const location = useLocation();
  const { cid } = useParams<{ cid: string }>();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
    "Settings",
  ];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((label) => {
        const url = `/Kambaz/Courses/${cid}/${label}`;
        // match exactly or any deeper sub-route
        const active =
          location.pathname === url ||
          location.pathname.startsWith(`${url}/`);

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
