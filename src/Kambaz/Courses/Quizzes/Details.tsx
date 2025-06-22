
// src/Kambaz/Courses/Quizzes/Details.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Table, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as api from "./client";
import { updateQuiz } from "./reducer";

export default function QuizDetails(){
  const { qid, cid }    = useParams();
  const { currentUser } = useSelector((s:any)=>s.accountReducer);
  const dispatch        = useDispatch();
  const [quiz,setQuiz]  = useState<any>(null);

  useEffect(()=>{ (async()=>{ if(qid){ setQuiz(await api.getQuiz(qid)); } })(); },[qid]);

  const togglePublish = async() => {
    if(!quiz) return;
    const updated = { ...quiz, published: !quiz.published };
    await api.publishQuiz(updated._id, updated.published);
    setQuiz(updated);
    dispatch(updateQuiz(updated));                 // keep list in-sync
  };

  if(!quiz) return <Spinner className="m-3"/>;

  const rows = [
    ["Quiz Type", quiz.quizType ?? ""],
    ["Points", quiz.points],
    ["Assignment Group", quiz.assignmentGroup],
    ["Shuffle Answers", quiz.shuffleAnswers?"Yes":"No"],
    ["Time Limit", quiz.timeLimit?`${quiz.timeLimit} Minutes`:"None"],
    ["Multiple Attempts", quiz.multipleAttempts?"Yes":"No"],
    ["Due", quiz.dueDate||"—"],
    ["Available", quiz.availableDate||"—"],
    ["Until", quiz.untilDate||"—"]
  ];

  return (
    <div className="p-3">
      <h3 className="d-flex justify-content-between align-items-center">
        {quiz.title}
        {currentUser?.role==="FACULTY" && (
          <span>
            <Button
              variant={quiz.published?"warning":"success"}
              className="me-2"
              onClick={togglePublish}
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
            <Button as={Link as any} to="edit"     variant="secondary" className="me-2">Edit</Button>
            <Button as={Link as any} to="preview"  variant="secondary">Preview</Button>
          </span>
        )}
      </h3>

      <Table bordered size="sm">
        <tbody>
          {rows.map(([k,v])=> <tr key={k as string}><th>{k}</th><td>{v}</td></tr>)}
        </tbody>
      </Table>

      {/* student CTA */}
      {currentUser?.role==="STUDENT" && quiz.published && (
        <Button as={Link as any} to="take" variant="primary">Take Quiz</Button>
      )}
    </div>
  );
}
