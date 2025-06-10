import axios from "axios";
const REMOTE = import.meta.env.VITE_REMOTE_SERVER;
export const fetchUsersForCourse = async (cid:string)=>
  (await axios.get(`${REMOTE}/api/courses/${cid}/users`)).data;
