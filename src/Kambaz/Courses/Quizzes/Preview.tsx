/* ──────────────────────────────────────────────────────────────
   Faculty Preview — thin wrapper around TakeQuiz in preview mode
──────────────────────────────────────────────────────────────── */
import { useParams } from "react-router-dom";
import TakeQuiz from "./Take";

/** Renders the quiz exactly as students see it but in “preview” mode.
 * No data are stored; the component is otherwise identical. */
export default function Preview(){
  const { qid } = useParams();
  if(!qid) return null;        // defensive; router always sets qid
  return <TakeQuiz preview />;
}
