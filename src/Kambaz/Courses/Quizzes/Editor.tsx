import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form, Row, Col, Button, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as api from "./client";
import { addQuiz, updateQuiz } from "./reducer";

type QuizForm = {
  _id?: string;
  title: string;
  description: string;
  points: number;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  quizType: string;
};

const defaultDates = () => {
  const now = new Date();
  const toISO = (d:Date)=>d.toISOString().slice(0,16);
  const due = new Date(now); due.setDate(due.getDate()+7);
  return { availableDate:toISO(now), dueDate:toISO(due), untilDate:toISO(due) };
};

export default function QuizEditor(){
  const { cid, qid } = useParams();
  const navigate     = useNavigate();
  const dispatch     = useDispatch();

  const [tab,setTab] = useState<"DETAILS"|"QUESTIONS">("DETAILS");
  const [quiz,setQuiz] = useState<QuizForm>({
    title:"New Quiz", description:"", points:0,
    assignmentGroup:"Quizzes", shuffleAnswers:true,
    timeLimit:20, quizType:"GRADED", ...defaultDates()
  });

  useEffect(()=>{(async()=>{
    if(qid && qid!=="new"){
      const data = await api.getQuiz(qid);
      setQuiz(data);
    }
  })()},[qid]);

  const handle=(k:keyof QuizForm,v:any)=>setQuiz(p=>({...p,[k]:v}));

  const save=async(pub=false)=>{
    let data;
    if(qid==="new"){
      data=await api.createQuiz(cid!,{...quiz,published:pub});
      dispatch(addQuiz(data));
    }else{
      data={...quiz,published:pub} as any;
      await api.updateQuiz(data);
      dispatch(updateQuiz(data));
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  return <div className="p-3">
    <Nav variant="tabs" activeKey={tab} onSelect={(k)=>setTab(k as any)}>
      <Nav.Item><Nav.Link eventKey="DETAILS">Details</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link eventKey="QUESTIONS" as={Link as any}
        to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/questions`}>
        Questions</Nav.Link></Nav.Item>
    </Nav><br/>
    {tab==="DETAILS" && <>
      <Form>
        <Form.Group controlId="wd-title" className="mb-3">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control value={quiz.title} onChange={e=>handle("title",e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="wd-desc" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={6} value={quiz.description}
            onChange={e=>handle("description",e.target.value)}/>
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>Shuffle Answers</Form.Label>
            <Form.Check type="checkbox" checked={quiz.shuffleAnswers}
              onChange={e=>handle("shuffleAnswers",e.target.checked)}/>
          </Col>
          <Col md={4}>
            <Form.Label>Time Limit (min)</Form.Label>
            <Form.Control type="number" min={0} value={quiz.timeLimit}
              onChange={e=>handle("timeLimit",Number(e.target.value)||0)}/>
          </Col>
        </Row>
      </Form>
      <hr/>
      <div className="text-end">
        <Button variant="secondary" className="me-2"
          onClick={()=>navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>Cancel</Button>
        <Button variant="danger" className="me-2" onClick={()=>save(false)}>Save</Button>
        <Button variant="success" onClick={()=>save(true)}>Save & Publish</Button>
      </div>
    </>}
  </div>;
}
