import axios from "axios";
const REMOTE = import.meta.env.VITE_REMOTE_SERVER;
const MODULES = `${REMOTE}/api/modules`;
export const deleteModule = async(id:string)=> (await axios.delete(`${MODULES}/${id}`)).data;
export const updateModule = async(m:any)=>     (await axios.put(`${MODULES}/${m._id}`, m)).data;