
// src/Kambaz/Courses/Quizzes/Questions.tsx
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import * as api from "./client";
import { setQuestions, addQuestion, deleteQuestion } from "./reducer";
import { FaPlus, FaTrash, FaPencilAlt } from "react-icons/fa";

export default function Questions(){
  const { qid, cid } = useParams();
  const dispatch     = useDispatch();
  const { questions } = useSelector((s:any)=>s.quizzesReducer);

  useEffect(()=>{ (async()=>{ if(qid) dispatch(setQuestions(await api.listQuestions(qid))); })(); },[qid,dispatch]);

  const add = async() => {
    const q = await api.createQuestion(qid!,{
      title:"New Question", qType:"MCQ", points:1,
      body:"Edit question…", mcqOptions:[
        {_id:"o1",text:"Option 1",correct:true},
        {_id:"o2",text:"Option 2",correct:false}
      ]
    });
    dispatch(addQuestion(q));
  };

  const remove = async(id:string) => {
    if(!window.confirm("Delete question?")) return;
    await api.deleteQuestion(id);
    dispatch(deleteQuestion(id));
  };

  return (
    <div className="p-3">
      <h4 className="d-flex justify-content-between">
        Questions
        <Button onClick={add}><FaPlus className="me-1"/>New Question</Button>
      </h4>

      {questions.length===0 ? <p className="text-muted">No questions yet.</p> :
        <ListGroup>
          {questions.map((q:any)=>(
            <ListGroup.Item key={q._id} className="d-flex align-items-center">
              <div className="flex-fill">
                <b>{q.title}</b> — {q.qType} • {q.points} pts
              </div>

              {/* edit */}
              <Link to={`${q._id}`} className="btn btn-outline-primary btn-sm me-2">
                <FaPencilAlt/>
              </Link>

              {/* delete */}
              <Button variant="outline-danger" size="sm" onClick={()=>remove(q._id)}>
                <FaTrash/>
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      }

      <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`} className="btn btn-secondary mt-3">
        Back to Quiz
      </Link>
    </div>
  );
}
