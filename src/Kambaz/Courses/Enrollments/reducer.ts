import { createSlice } from "@reduxjs/toolkit";
export interface Enrollment { _id:string; user:string; course:string; }
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState: { enrollments: [] as Enrollment[] },
  reducers: {
    setEnrollments: (state,{payload}) => { state.enrollments = payload; },
    enrollCourse:   (state,{payload}) => {
      const already = state.enrollments.some(e=> e.user===payload.userId && e.course===payload.courseId);
      if(!already) state.enrollments.push({ _id: payload._id ?? Date.now().toString(), user: payload.userId, course: payload.courseId });
    },
    unenrollCourse: (state,{payload}) => {
      state.enrollments = state.enrollments.filter(e=> !(e.user===payload.userId && e.course===payload.courseId));
    },
  },
});
export const { setEnrollments, enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;