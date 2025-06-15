import axios from "axios";
const axiosWithCreds = axios.create({ withCredentials:true });

const REMOTE = import.meta.env.VITE_REMOTE_SERVER;
const USERS  = `${REMOTE}/api/users`;

export const fetchMyEnrollments = async ()=>
  (await axiosWithCreds.get(`${USERS}/current/enrollments`)).data;

export const enroll   = async (uid:string,cid:string)=>
  (await axiosWithCreds.post (`${USERS}/${uid}/courses/${cid}`)).data;

export const unenroll = async (uid:string,cid:string)=>
  (await axiosWithCreds.delete(`${USERS}/${uid}/courses/${cid}`)).data;
