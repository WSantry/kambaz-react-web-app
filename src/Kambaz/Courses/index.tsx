import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import PeopleDetails from "./People/Details";
import { FaAlignJustify } from "react-icons/fa6";

/* ★ NEW: quizzes screens */
import Quizzes         from "./Quizzes";
import QuizDetails     from "./Quizzes/Details";
import QuizEditor      from "./Quizzes/Editor";
import QuizPreview     from "./Quizzes/Preview";
import QuizQuestions   from "./Quizzes/Questions";
import QuestionEditor  from "./Quizzes/QuestionEditor";
import TakeQuiz        from "./Quizzes/Take";

interface RootState {
  coursesReducer: {
    courses: { _id: string; name: string }[];
  };
}

export default function Courses() {
  const { cid } = useParams<{ cid?: string }>();
  const { pathname } = useLocation();
  const { courses } = useSelector((s: RootState) => s.coursesReducer);
  const course = courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name} &gt; {pathname.split("/")[4] || "Home"}
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
            <Route path="/"                    element={<Navigate to="Home" />} />
            <Route path="Home"                 element={<Home />} />
            <Route path="Modules"              element={<Modules />} />
            <Route path="Assignments"          element={<Assignments />} />
            <Route path="Assignments/:aid"     element={<AssignmentEditor />} />

            {/* ---------- PEOPLE ---------- */}
            <Route path="People/:uid?"         element={<PeopleLayout />} />

            {/* stubs */}
            <Route path="Piazza"               element={<h2>Piazza</h2>} />
            <Route path="Zoom"                 element={<h2>Zoom</h2>} />

            {/* ────────── QUIZZES ────────── */}
            <Route path="Quizzes"                                element={<Quizzes />} />
            <Route path="Quizzes/:qid"                           element={<QuizDetails />} />
            <Route path="Quizzes/:qid/edit"                      element={<QuizEditor />} />
            <Route path="Quizzes/:qid/preview"                   element={<QuizPreview />} />
            <Route path="Quizzes/:qid/questions"                 element={<QuizQuestions />} />
            <Route path="Quizzes/:qid/questions/:qqid"           element={<QuestionEditor />} />
            <Route path="Quizzes/:qid/take"                      element={<TakeQuiz />} />

            <Route path="Grades"   element={<h2>Grades</h2>} />
            <Route path="Settings" element={<h2>Settings</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function PeopleLayout() {
  const { uid } = useParams<{ uid?: string }>();
  return (
    <>
      <PeopleTable />
      {uid && <PeopleDetails key={uid} />}
    </>
  );
}
