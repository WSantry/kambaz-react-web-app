import axios from "axios";
const axiosWithCreds = axios.create({ withCredentials:true });

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API     = `${REMOTE_SERVER}/api/users`;

/* ───── auth ───── */
export const signin   = async (cred:any)=> (await axiosWithCreds.post(`${USERS_API}/signin`, cred)).data;
export const signup   = async (user:any)=> (await axiosWithCreds.post(`${USERS_API}/signup`, user)).data;
export const profile  = async ()=>          (await axiosWithCreds.post(`${USERS_API}/profile`)).data;
export const signout  = async ()=>          (await axiosWithCreds.post(`${USERS_API}/signout`)).data;

/* ───── users CRUD ───── */
export const findAllUsers           = async ()=> (await axiosWithCreds.get (USERS_API)).data;
export const findUsersByRole        = async (r:string)=> (await axiosWithCreds.get (`${USERS_API}?role=${r}`)).data;
export const findUsersByPartialName = async (n:string)=> (await axiosWithCreds.get (`${USERS_API}?name=${n}`)).data;
export const findUserById           = async (id:string)=> (await axiosWithCreds.get (`${USERS_API}/${id}`)).data;
export const createUser             = async (u:any)=> (await axiosWithCreds.post(`${USERS_API}`, u)).data;
export const deleteUser             = async (id:string)=> (await axiosWithCreds.delete(`${USERS_API}/${id}`)).data;
export const updateUser             = async (u:any)=> (await axiosWithCreds.put (`${USERS_API}/${u._id}`, u)).data;

/* ───── courses / enrollments ───── */
export const findCoursesForUser   = async (uid:string)=> (await axiosWithCreds.get(`${USERS_API}/${uid}/courses`)).data;
export const enrollIntoCourse     = async (uid:string,cid:string)=> (await axiosWithCreds.post(`${USERS_API}/${uid}/courses/${cid}`)).data;
export const unenrollFromCourse   = async (uid:string,cid:string)=> (await axiosWithCreds.delete(`${USERS_API}/${uid}/courses/${cid}`)).data;
