import axios from "axios";
const REMOTE = import.meta.env.VITE_REMOTE_SERVER;
const COURSES = `${REMOTE}/api/courses`;

export const fetchAllCourses       = async ()=> (await axios.get(COURSES)).data;
export const deleteCourse          = async (id:string)=> (await axios.delete(`${COURSES}/${id}`)).data;
export const updateCourse          = async (c:any)=>     (await axios.put   (`${COURSES}/${c._id}`, c)).data;
export const findModulesForCourse  = async (cid:string)=> (await axios.get   (`${COURSES}/${cid}/modules`)).data;
export const createModuleForCourse = async (cid:string,m:any)=> (await axios.post(`${COURSES}/${cid}/modules`, m)).data;