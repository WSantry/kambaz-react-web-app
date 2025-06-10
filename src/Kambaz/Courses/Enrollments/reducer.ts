import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState = {
  enrollments: [] as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    enrollCourse: (state, { payload }) => {
      const exists = state.enrollments.some(
        e => e.user === payload.userId && e.course === payload.courseId
      );
      if (!exists) {
        state.enrollments.push({
          _id: uuidv4(),
          user: payload.userId,
          course: payload.courseId,
        });
      }
    },
    unenrollCourse: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        e => !(e.user === payload.userId && e.course === payload.courseId)
      );
    },
  },
});

export const {
  setEnrollments,
  enrollCourse,
  unenrollCourse,
} = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
