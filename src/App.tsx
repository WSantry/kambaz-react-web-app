// src/App.tsx
import { useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Your existing Labs landing page
import Labs from "./Labs";

// The new Kambaz entry point
import Kambaz from "./Kambaz";

// (Optional) Your original Home component—no longer the default
function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount(c => c + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more from willem
      </p>

      {/* Link to Labs */}
      <Link to="/Labs" style={{ marginTop: 20, display: "inline-block" }}>
        Go to Labs
      </Link>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/** 1) Default “/” goes to Kambaz */}
        <Route path="/" element={<Navigate to="/Kambaz" replace />} />

        {/** 2) All Kambaz screens under /Kambaz/* */}
        <Route path="/Kambaz/*" element={<Kambaz />} />

        {/** 3) Your Labs under /Labs/* */}
        <Route path="/Labs/*" element={<Labs />} />

        {/** 4) Fallback any unknown URL back to Kambaz */}
        <Route path="*" element={<Navigate to="/Kambaz" replace />} />
      </Routes>
    </HashRouter>
  );
}
