import axios from "axios";
const axiosWithCreds = axios.create({ withCredentials: true });

const REMOTE  = import.meta.env.VITE_REMOTE_SERVER;
const COURSES = `${REMOTE}/api/courses`;

/* ────────────── courses CRUD ────────────── */
export const fetchAllCourses = async () =>
  (await axiosWithCreds.get(COURSES)).data;

export const createCourse = async (course: any) =>
  (await axiosWithCreds.post(COURSES, course)).data;   // ← ADDED

export const deleteCourse = async (id: string) =>
  (await axiosWithCreds.delete(`${COURSES}/${id}`)).data;

export const updateCourse = async (c: any) =>
  (await axiosWithCreds.put(`${COURSES}/${c._id}`, c)).data;

/* ─────────────── modules helpers ─────────────── */
export const findModulesForCourse = async (cid: string) =>
  (await axiosWithCreds.get(`${COURSES}/${cid}/modules`)).data;

export const createModuleForCourse = async (cid: string, m: any) =>
  (await axiosWithCreds.post(`${COURSES}/${cid}/modules`, m)).data;

/* ─────────────── people helpers ─────────────── */
export const findUsersForCourse = async (cid: string) =>
  (await axiosWithCreds.get(`${COURSES}/${cid}/users`)).data;
