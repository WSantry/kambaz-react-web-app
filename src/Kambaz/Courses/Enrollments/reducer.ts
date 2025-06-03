import { createSlice } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

export interface Enrollment {
  _id: string;
  user: string;   // user _id
  course: string; // course _id
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: initialEnrollments as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    /** Add a new enrollment if one doesn’t already exist. */
    enrollCourse: (
      state,
      {
        payload,
      }: { payload: { userId: string; courseId: string } }
    ) => {
      const alreadyEnrolled = state.enrollments.some(
        (e) => e.user === payload.userId && e.course === payload.courseId
      );
      if (!alreadyEnrolled) {
        state.enrollments.push({
          _id: uuidv4(),
          user: payload.userId,
          course: payload.courseId,
        });
      }
    },
    /** Remove an existing enrollment (if present). */
    unenrollCourse: (
      state,
      {
        payload,
      }: { payload: { userId: string; courseId: string } }
    ) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.userId && e.course === payload.courseId)
      );
    },
  },
});

export const { enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
