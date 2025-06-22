import axios from "axios";

const axiosWithCreds = axios.create({ withCredentials: true });
const REMOTE = import.meta.env.VITE_REMOTE_SERVER;
const BASE   = `${REMOTE}/api`;

/* ─── QUIZZES CRUD ─── */
export const listQuizzes = async (cid: string) =>
  (await axiosWithCreds.get(`${BASE}/courses/${cid}/quizzes`)).data;

export const createQuiz = async (cid: string, q: any) =>
  (await axiosWithCreds.post(`${BASE}/courses/${cid}/quizzes`, q)).data;

export const updateQuiz = async (q: any) =>
  (await axiosWithCreds.put(`${BASE}/quizzes/${q._id}`, q)).data;

export const deleteQuiz = async (id: string) =>
  (await axiosWithCreds.delete(`${BASE}/quizzes/${id}`)).data;

export const publishQuiz = async (id: string, pub: boolean) =>
  updateQuiz({ _id: id, published: pub });

/* ─── SINGLE QUIZ ─── */
export const getQuiz = async (id: string) =>
  (await axiosWithCreds.get(`${BASE}/quizzes/${id}`)).data;

/* ─── QUESTIONS ─── */
export const listQuestions = async (qid: string) =>
  (await axiosWithCreds.get(`${BASE}/quizzes/${qid}/questions`)).data;

export const createQuestion = async (qid: string, q: any) =>
  (await axiosWithCreds.post(`${BASE}/quizzes/${qid}/questions`, q)).data;

// now properly nested under /quizzes/:qid/questions/:questionId
export const updateQuestion = async (qid: string, q: any) =>
  (await axiosWithCreds.put(
    `${BASE}/quizzes/${qid}/questions/${q._id}`,
    q
  )).data;

export const deleteQuestion = async (qid: string, id: string) =>
  (await axiosWithCreds.delete(
    `${BASE}/quizzes/${qid}/questions/${id}`
  )).data;

/* ─── ATTEMPTS ─── */
export const listAttempts = async (qid: string) =>
  (await axiosWithCreds.get(`${BASE}/quizzes/${qid}/attempts/current`)).data;

export const submitAttempt = async (qid: string, a: any) =>
  (await axiosWithCreds.post(`${BASE}/quizzes/${qid}/attempts`, a)).data;
