import { Routes, Route, Navigate } from "react-router-dom";
import TOC from "./TOC";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>

      <p>Author: <strong>Willem Santry (Section XYZ)</strong></p>
      <p>
        <a href="#/Kambaz">Go to Kambaz</a>
      </p>
      <p>
        <a
          id="wd-github"
          href="https://github.com/WSantry/kambaz-react-web-app.git"
          target="_blank"
          rel="noreferrer"
        >
          My GitHub Repo
        </a>
      </p>

      {/* Table of Contents */}
      <TOC />

      {/* Nested routes */}
      <Routes>
        {/* Default to Lab1 on /Labs */}
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
      </Routes>
    </div>
  );
}
