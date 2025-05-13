import { Routes, Route, Navigate } from 'react-router-dom'
import CourseNavigation from './Navigation'
import Home from './Home'
import Modules from './Modules'
import Assignments from './Assignments'
import AssignmentEditor from './Assignments/Editor'

export default function Courses() {
  return (
    <div id="wd-courses">
      <h2>Course 1234</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            {/* Left column: Course nav */}
            <td valign="top">
              <CourseNavigation />
            </td>

            {/* Right column: Different sub-screens */}
            <td valign="top">
              <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />} />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                <Route path="People" element={<h2>People</h2>} />
                <Route path="Piazza" element={<h2>Piazza</h2>} />
                <Route path="Zoom" element={<h2>Zoom</h2>} />
                <Route path="Quizzes" element={<h2>Quizzes</h2>} />
                <Route path="Grades" element={<h2>Grades</h2>} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
