/* ──────────────────────────────────────────────────────────────
   Quiz runner – used by BOTH students (“take”) and faculty (“preview”)
──────────────────────────────────────────────────────────────── */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Card, Pagination, Button, Alert, Badge } from "react-bootstrap";
import { marked } from "marked";
import * as api from "./client";

/* ── helpers ────────────────────────────────────────────────── */
type MCQVal = string;                 // option _id
type TFVal  = boolean;                // true / false
type FIBVal = Record<string,string>;  // { blankId:"answer", … }
type Answer = MCQVal | TFVal | FIBVal;

const BLANK_RE = /___([1-9][0-9]*)___/g;
const extractIds = (body = ""): string[] =>
  [...body.matchAll(BLANK_RE)].map(m => m[1]);

/* ── component ──────────────────────────────────────────────── */
export default function TakeQuiz(props: { preview?: boolean }){
  const { preview = false } = props;
  const { qid }     = useParams();
  const currentUser = useSelector((s:any)=>s.accountReducer.currentUser);

  /* state */
  const [quiz   , setQuiz   ] = useState<any|null>(null);
  const [questions,setQuestions]  = useState<any[]>([]);
  const [cursor , setCursor ] = useState(0);
  const [answers, setAnswers] = useState<Record<string,Answer>>({});
  const [result , setResult ] = useState<null|{score:number; correct:Record<string,boolean>;}>(null);
  const [attempts,setAttempts]= useState<any[]>([]);

  /* fetch quiz meta, questions, attempts (students only) */
  useEffect(()=>{(async()=>{
    if(!qid) return;
    setQuiz(await api.getQuiz(qid));
    setQuestions(await api.listQuestions(qid));
    if(!preview && currentUser?.role==="STUDENT")
      setAttempts(await api.listAttempts(qid));
  })();},[qid,preview,currentUser]);

  /* existing attempt gate */
  const attemptsLeft = quiz
    ? quiz.multipleAttempts
        ? Math.max(0, (quiz.maxAttempts ?? 1) - attempts.length)
        : attempts.length === 0 ? 1 : 0
    : 0;
  const blocked     = !preview && attemptsLeft === 0;

  /* early exits */
  if(!quiz || questions.length===0) return null;
  if(blocked && !result)               // show last result if blocked
    return (
      <div className="p-3">
        <Alert variant="warning">
          You have exhausted all attempts for this quiz.
        </Alert>
        <AttemptSummary attempt={attempts[attempts.length - 1]} questions={questions}/>
      </div>
    );

  /* helpers ************************* */
  const q   = questions[cursor];
  const sel = answers[q._id];

  const recordAnswer = (val:Answer) =>
    setAnswers(p=>({...p,[q._id]:val}));

  const scoreQuiz = () => {
    let score = 0; const correct:Record<string,boolean> = {};
    for(const qq of questions){
      const ans = answers[qq._id];
      let ok=false;

      if(qq.qType==="MCQ"){
        ok = qq.mcqOptions?.find((o:any)=>o._id===ans)?.correct;
      }
      else if(qq.qType==="TF"){
        ok = ans===qq.tfAnswer;
      }
      else if(qq.qType==="FIB"){
        const blanks = qq.fibBlanks||[];
        const ansObj = ans as FIBVal ?? {};
        ok = blanks.every((b:any)=>
          b.answers.some((a:string)=>
            (ansObj[b._id]||"").trim().toLowerCase()===a.trim().toLowerCase()));
      }

      if(ok){ score += qq.points; correct[qq._id]=true; }
      else   correct[qq._id]=false;
    }
    return {score, correct};
  };

  const submit = async() => {
    const {score, correct} = scoreQuiz();
    let attempt;
    if(preview){
      attempt = { score, answers, correct, finishedAt:new Date() };
    }else{
      attempt = await api.submitAttempt(qid!,{
        score,
        answers:Object.entries(answers).map(([questionId,value])=>({questionId,value}))
      });
      setAttempts([...attempts, attempt]);
    }
    setResult({score, correct});
  };

  /* UI blocks ************************ */
  if(result)
    return <AttemptSummary attempt={result} questions={questions} />;

  return (
    <div className="p-3">
      {/* header */}
      <h4 className="d-flex justify-content-between">
        <span>
          {preview ? "Preview" : "Quiz"} – Question {cursor+1} / {questions.length}
        </span>
        {preview
          ? <Badge bg="secondary">Faculty Preview</Badge>
          : <Badge bg="info">Attempts left: {attemptsLeft}</Badge>}
      </h4>

      {/* question card */}
      <Card className="mb-3"><Card.Body>
        <div dangerouslySetInnerHTML={{__html:marked.parse(q.body||"")}}/>

        {/* MCQ */}
        {q.qType==="MCQ" && q.mcqOptions.map((o:any)=>(
          <div key={o._id}>
            <input
              type="radio"
              name={`mcq_${q._id}`}
              className="me-2"
              checked={sel===o._id}
              onChange={()=>recordAnswer(o._id)}
            /> {o.text}
          </div>
        ))}

        {/* TF */}
        {q.qType==="TF" && [true,false].map((v,i)=>(
          <div key={i}>
            <input
              type="radio"
              name={`tf_${q._id}`}
              className="me-2"
              checked={sel===v}
              onChange={()=>recordAnswer(v)}
            /> {v ? "True":"False"}
          </div>
        ))}

        {/* FIB – list inputs for each blank */}
        {q.qType==="FIB" && (()=>{ 
          const ids:string[] = q.fibBlanks?.map((b:any)=>b._id) || extractIds(q.body);
          const fibVal:FIBVal = (sel as FIBVal) ?? {};
          return ids.map(id=>(
            <div key={id} className="mb-2">
              <label className="me-2 fw-semibold">Blank {id}:</label>
              <input
                className="form-control d-inline-block w-auto"
                value={fibVal[id]||""}
                onChange={e=>{
                  const next = { ...fibVal, [id]:e.target.value };
                  recordAnswer(next);
                }}
              />
            </div>
          ));
        })()}
      </Card.Body></Card>

      {/* pagination */}
      <Pagination>
        {questions.map((_:any,i:number)=>(
          <Pagination.Item key={i} active={i===cursor} onClick={()=>setCursor(i)}>
            {i+1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* submit */}
      {cursor===questions.length-1 &&
        <Button
          variant={preview ? "secondary":"primary"}
          disabled={Object.keys(answers).length!==questions.length}
          onClick={submit}
        >
          {preview ? "Finish Preview" : "Submit Quiz"}
        </Button>}
    </div>
  );
}

/* ── result screen ─ */
function AttemptSummary({attempt, questions}:{attempt:any;questions:any[]}){
  const correct:Record<string,boolean> = attempt.correct ??
    Object.fromEntries((attempt.answers||[]).map((a:any)=>[a.questionId, a.correct]));
  return (
    <div className="p-3">
      <h3>Your Score: {attempt.score}</h3>
      {questions.map(q=>(
        <Card key={q._id} className="mb-2"
          bg={correct[q._id] ? "success":"danger"}
          text="light">
          <Card.Body>
            <div dangerouslySetInnerHTML={{__html:marked.parse(q.body||"")}}/>
            {correct[q._id] ? "✓ Correct" : "✗ Incorrect"}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
