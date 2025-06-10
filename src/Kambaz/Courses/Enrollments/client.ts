import axios from "axios";
const REMOTE  = import.meta.env.VITE_REMOTE_SERVER;
const USERS   = `${REMOTE}/api/users`;

const axiosWithCreds = axios.create({ withCredentials: true });

export const fetchMyEnrollments = async () =>
  (await axiosWithCreds.get(`${USERS}/current/enrollments`)).data;

export const enroll = async (uid: string, cid: string) =>
  (await axiosWithCreds.post(`${USERS}/${uid}/enroll/${cid}`)).data;

export const unenroll = async (uid: string, cid: string) =>
  (await axiosWithCreds.delete(`${USERS}/${uid}/enroll/${cid}`)).data;
