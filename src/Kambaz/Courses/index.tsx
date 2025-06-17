// src/Kambaz/Courses/index.tsx
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import CourseNavigation   from "./Navigation";
import Home               from "./Home";
import Modules            from "./Modules";
import Assignments        from "./Assignments";
import AssignmentEditor   from "./Assignments/Editor";
import PeopleTable        from "./People/Table";
import { FaAlignJustify } from "react-icons/fa6";
import PeopleDetails from "./People/Details";

export default function Courses() {
  const { cid }         = useParams();
  const { pathname }    = useLocation();
  const { courses }     = useSelector((s: any) => s.coursesReducer); // ✅ fixed
  const course          = courses.find((c: any) => c._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />

      <div className="d-flex">
        {/* left-hand nav */}
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>

        {/* main column */}
        <div className="flex-fill ms-3 overflow-auto" style={{ minWidth: 0 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home"               element={<Home />} />
            <Route path="Modules"            element={<Modules />} />
            <Route path="Assignments"        element={<Assignments />} />
            <Route path="Assignments/:aid"   element={<AssignmentEditor />} />

            {/* ---------- PEOPLE (single table + single drawer) ---------- */}
            <Route path="People/:uid?" element={<PeopleLayout />} />

            {/* stubs */}
            <Route path="Piazza"   element={<h2>Piazza</h2>} />
            <Route path="Zoom"     element={<h2>Zoom</h2>} />
            <Route path="Quizzes"  element={<h2>Quizzes</h2>} />
            <Route path="Grades"   element={<h2>Grades</h2>} />
            <Route path="Settings" element={<h2>Settings</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

/* layout that guarantees ONE table + ONE drawer */
function PeopleLayout() {
  const { uid } = useParams();           // grab the :uid param
  return (
    <>
      <PeopleTable />
      {uid && <PeopleDetails key={uid} />}
    </>
  );
}