import { Link } from 'react-router-dom'

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button> + </button>
      </h3>

      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            to="/Kambaz/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            to="/Kambaz/Courses/1234/Assignments/234"
            className="wd-assignment-link"
          >
            A2 - CSS & Layout
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            to="/Kambaz/Courses/1234/Assignments/345"
            className="wd-assignment-link"
          >
            A3 - JavaScript
          </Link>
        </li>
      </ul>
    </div>
  )
}
