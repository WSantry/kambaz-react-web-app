import { Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import KambazNavigation from "./Navigation";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";

export default function Kambaz() {
  return (
    <div id="wd-kambaz">
      {/* Left fixed nav */}
      <KambazNavigation />

      {/* Right main content, offset so nav won't overlap */}
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Courses/:cid/*" element={<Courses />} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="Account" />} />
        </Routes>
      </div>
    </div>
  );
}
