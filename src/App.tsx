import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
/*import "./App.css";*/
import Labs from "./Labs";
import Kambaz from "./Kambaz";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/*
          Chapter 1 example: default to /Labs.
          If you prefer Kambaz to be the landing page, set path="/" -> Kambaz instead.
        */}
        <Route path="/" element={<Navigate to="/Labs" replace />} />

        {/* Labs */}
        <Route path="/Labs/*" element={<Labs />} />

        {/* Kambaz */}
        <Route path="/Kambaz/*" element={<Kambaz />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/Labs" replace />} />
      </Routes>
    </HashRouter>
  );
}
