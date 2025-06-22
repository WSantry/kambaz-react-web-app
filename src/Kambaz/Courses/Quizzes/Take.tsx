import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Card, Pagination } from "react-bootstrap";
import * as api from "./client";
//import { useSelector } from "react-redux";
import { marked } from "marked"; 

export default function TakeQuiz(){
  const { qid } = useParams();
  //const { currentUser } = useSelector((s:any)=>s.accountReducer);
  const [questions,setQuestions] = useState<any[]>([]);
  const [answers,setAnswers]     = useState<any>({});
  const [cursor,setCursor]       = useState(0);
  const question = questions[cursor];
  const [submitted,setSubmitted] = useState<any>(null);

  useEffect(()=>{(async()=>{
    if(qid) setQuestions(await api.listQuestions(qid));
  })();},[qid]);

  if(submitted) return <div className="p-3"><h3>Score: {submitted.score}</h3></div>;
  if(!questions.length) return null;

  const q = questions[cursor];

  const handleSelect=(val:any)=>setAnswers({...answers,[q._id]:val});

  const submit=async()=>{
    let score=0;
    questions.forEach(qq=>{
      const ans = answers[qq._id];
      if(qq.qType==="MCQ"){
        const opt = qq.mcqOptions.find((o:any)=>o._id===ans);
        if(opt?.correct) score+=qq.points;
      }else if(qq.qType==="TF"){
        if(ans===qq.tfAnswer) score+=qq.points;
      }else if(qq.qType==="FIB"){
        const ok = (qq.fibAnswers||[]).some((a:string)=>a.toLowerCase()===String(ans).toLowerCase());
        if(ok) score+=qq.points;
      }
    });
    const attempt = await api.submitAttempt(qid!,{ score, answers });
    setSubmitted(attempt);
  };

  return <div className="p-3">
    <h4>Question {cursor+1} / {questions.length}</h4>
    <Card className="mb-3"><Card.Body>
      <div
  dangerouslySetInnerHTML={{
    __html: marked.parse(question.body ?? ""),
  }}
/>
      {q.qType==="MCQ" && q.mcqOptions.map((o:any)=>(
        <div key={o._id}>
          <input type="radio" name="mcq" checked={answers[q._id]===o._id}
            onChange={()=>handleSelect(o._id)}/> {o.text}
        </div>
      ))}
      {q.qType==="TF" && ["True","False"].map((v,i)=>(
        <div key={i}>
          <input type="radio" name="tf" checked={answers[q._id]=== (v==="True")}
            onChange={()=>handleSelect(v==="True")}/> {v}
        </div>
      ))}
      {q.qType==="FIB" &&
        <input className="form-control w-50" value={answers[q._id]||""}
          onChange={e=>handleSelect(e.target.value)}/>}
    </Card.Body></Card>

    <Pagination>
      {questions.map((_:any,i:number)=>(
        <Pagination.Item key={i} active={i===cursor} onClick={()=>setCursor(i)}>{i+1}</Pagination.Item>
      ))}
    </Pagination>
    {cursor===questions.length-1 &&
      <Button onClick={submit}>Submit Quiz</Button>}
  </div>;
}
