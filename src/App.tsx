import store from "./Kambaz/store";
import { Provider } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Labs from "./Labs";
import Kambaz from "./Kambaz";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
      <Routes>
        {/* The default root route -> Kambaz */}
        <Route path="/" element={<Navigate to="/Kambaz" replace />} />

        {/* Kambaz */}
        <Route path="/Kambaz/*" element={<Kambaz />} />

        {/* Labs */}
        <Route path="/Labs/*" element={<Labs />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/Kambaz" replace />} />
      </Routes>
      </Provider>
    </HashRouter>
  );
}
