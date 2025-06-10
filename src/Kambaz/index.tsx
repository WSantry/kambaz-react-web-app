import { Routes, Route, Navigate } from "react-router-dom";

import "./styles.css";
import KambazNavigation from "./Navigation";
import Account   from "./Account";
import Dashboard from "./Dashboard";
import Courses   from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import EnrolledRoute  from "./Courses/EnrolledRoute";
import Session        from "./Account/Session";

export default function Kambaz() {
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