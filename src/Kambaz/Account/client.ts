import axios from "axios";
const axiosWithCreds = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API     = `${REMOTE_SERVER}/api/users`;

export const signin      = async (cred:any)=> (await axiosWithCreds.post(`${USERS_API}/signin`,  cred)).data;
export const signup      = async (user:any)=> (await axiosWithCreds.post(`${USERS_API}/signup`,  user)).data;
export const profile     = async ()=>          (await axiosWithCreds.post(`${USERS_API}/profile`          )).data;
export const signout     = async ()=>          (await axiosWithCreds.post(`${USERS_API}/signout`          )).data;
export const updateUser  = async (u:any)=>     (await axiosWithCreds.put (`${USERS_API}/${u._id}`, u      )).data;
export const findMyCourses = async ()=>        (await axiosWithCreds.get (`${USERS_API}/current/courses`   )).data;
export const createCourse  = async (c:any)=>   (await axiosWithCreds.post(`${USERS_API}/current/courses`,c )).data;