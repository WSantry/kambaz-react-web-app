import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

/* ---------- simple greeting --------------------------- */
export const fetchWelcomeMessage = async () => {
  const { data } = await axios.get(`${REMOTE_SERVER}/lab5/welcome`);
  return data;
};

/* ---------- assignment -------------------------------- */
const ASSIGN_API = `${REMOTE_SERVER}/lab5/assignment`;
export const fetchAssignment = async () => (await axios.get(ASSIGN_API)).data;
export const updateTitle     = async (title: string) =>
  (await axios.get(`${ASSIGN_API}/title/${title}`)).data;

/* ---------- todos ------------------------------------- */
const TODOS_API = `${REMOTE_SERVER}/lab5/todos`;
export const fetchTodos  = async () => (await axios.get(TODOS_API)).data;
export const createTodo  = async () => (await axios.get(`${TODOS_API}/create`)).data;
export const postTodo    = async (t: any) => (await axios.post(TODOS_API, t)).data;
export const removeTodo  = async (t: any) => (await axios.get(`${TODOS_API}/${t.id}/delete`)).data;
export const deleteTodo  = async (t: any) =>  axios.delete(`${TODOS_API}/${t.id}`);
export const updateTodo  = async (t: any) =>  axios.put(`${TODOS_API}/${t.id}`, t);
