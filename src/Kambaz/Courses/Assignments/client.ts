import axios from "axios";
const REMOTE = import.meta.env.VITE_REMOTE_SERVER;
const BASE   = `${REMOTE}/api`;

export const findAssignmentsForCourse  = async (cid:string)=>
  (await axios.get   (`${BASE}/courses/${cid}/assignments`)).data;

export const createAssignmentForCourse = async (cid:string,a:any)=>
  (await axios.post  (`${BASE}/courses/${cid}/assignments`, a)).data;

export const updateAssignment          = async (a:any)=>
  (await axios.put   (`${BASE}/assignments/${a._id}`, a)).data;

export const deleteAssignment          = async (aid:string)=>
  (await axios.delete(`${BASE}/assignments/${aid}`)).data;
