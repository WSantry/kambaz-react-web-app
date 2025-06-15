import axios from "axios";
const axiosWithCreds = axios.create({ withCredentials:true });

const REMOTE  = import.meta.env.VITE_REMOTE_SERVER;
const MODULES = `${REMOTE}/api/modules`;

export const deleteModule = async(id:string)=> (await axiosWithCreds.delete(`${MODULES}/${id}`)).data;
export const updateModule = async(m:any)=>     (await axiosWithCreds.put   (`${MODULES}/${m._id}`, m)).data;
