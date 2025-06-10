import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaFilePen, FaTrash } from "react-icons/fa6";

import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";

import * as client from "./client";
import { setAssignments, deleteAssignment } from "./reducer";

function fmt(d="") {
  if(!d) return "";
  const date = new Date(d);
  return date.toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit",hour12:true}).replace(","," at").replace(/ (AM|PM)$/i,m=>m.toLowerCase());
}

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((s:any)=>s.assignmentsReducer);
  const { currentUser } = useSelector((s:any)=>s.accountReducer);

  /* load from server */
  useEffect(()=>{ (async()=> dispatch(setAssignments(await client.findAssignmentsForCourse(cid!))))(); },[cid,dispatch]);

  const handleDelete = async (aid:string)=>{
    if(!window.confirm("Delete assignment?")) return;
    await client.deleteAssignment(aid);
    dispatch(deleteAssignment(aid));
  };

  return (
    <div id="wd-assignments" className="p-3">
      <AssignmentControls /><br/>
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
          <div className="p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3"/><b>ASSIGNMENTS</b>
            <AssignmentControlButtons />
          </div>
          <ListGroup className="rounded-0">
            {assignments.map((a:any)=>(
              <ListGroup.Item key={a._id} className="p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3"/>
                <FaFilePen className="me-3 text-success"/>
                <div className="flex-fill">
                  <Link to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`} className="fw-bold text-decoration-none text-dark">{a.title}</Link><br/>
                  <small className="text-muted"><b>Not available until</b> {fmt(a.availableDate)} | <b>Due</b> {fmt(a.dueDate)} | {a.points} pts</small>
                </div>
                {currentUser.role==="FACULTY" && (
                  <div className="d-flex align-items-center">
                    <FaTrash className="text-danger me-1 fs-4" style={{cursor:"pointer"}} onClick={()=>handleDelete(a._id)}/>
                    <LessonControlButtons />
                  </div>) }
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}