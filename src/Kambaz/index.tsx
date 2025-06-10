import { Routes, Route, Navigate } from "react-router-dom";

import "./styles.css";
import KambazNavigation from "./Navigation";
import Account   from "./Account";
import Dashboard from "./Dashboard";
import Courses   from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import EnrolledRoute  from "./Courses/EnrolledRoute";
import Session        from "./Account/Session";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as courseClient from "./Courses/client";
import { setCourses } from "./Courses/reducer";

export default function Kambaz() {
  const dispatch = useDispatch();

  /* ─── pull every course from the server on first render ─── */
  useEffect(() => {
    (async () => {
      try {
        const all = await courseClient.fetchAllCourses();
        dispatch(setCourses(all));
      } catch (err) {
        console.error("Could not load courses:", err);
      }
    })();
  }, [dispatch]);

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />

            {/* account */}
            <Route path="/Account/*" element={<Account />} />

            {/* dashboard */}
            <Route
              path="/Dashboard"
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />

            {/* courses */}
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <EnrolledRoute><Courses /></EnrolledRoute>
                </ProtectedRoute>
              }
            />

            {/* misc */}
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox"    element={<h1>Inbox</h1>} />
            <Route path="*"        element={<Navigate to="Account" />} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}