import { Routes, Route,  Link } from "react-router-dom";
import Lab1 from "./Lab1";

export default function Labs() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Labs Landing Page</h1>
      <ul>
        <li>
          <Link to="/Labs/Lab1">Go to Lab 1</Link>
        </li>
        {/* Add more labs here if needed, e.g. Lab2, Lab3 */}
        <li>
          <Link to="/">Back to Home</Link>
        </li>
      </ul>

      <hr />

      <Routes>
      
        

        {/* Lab1 route */}
        <Route path="Lab1" element={<Lab1 />} />
      </Routes>
    </div>
  );
}
