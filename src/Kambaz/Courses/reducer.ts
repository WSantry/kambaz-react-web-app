import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: [] as any[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    /* fetched from server */
    setCourses: (state, { payload }) => {
      state.courses = payload;
    },

    /* local optimistic CRUD (keeps UI snappy) */
    addCourse: (state, { payload }) => {
      state.courses.push({ ...payload, _id: payload._id ?? uuidv4() });
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(c => c._id !== courseId);
    },
    updateCourse: (state, { payload }) => {
      state.courses = state.courses.map(c =>
        c._id === payload._id ? payload : c
      );
    },
  },
});

export const { setCourses, addCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
