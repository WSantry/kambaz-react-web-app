import { Routes, Route, Navigate } from "react-router-dom";
import TOC from "./TOC";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      
      <p>Author: <strong>Willem Santry</strong></p>
      <p>
        <a href="#/Kambaz" >
          Go to Kambaz
        </a>
      </p>

      <TOC />

      <Routes>
        {/* Default to Lab1 when user goes to /Labs */}
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
      </Routes>
    </div>
  );
}
