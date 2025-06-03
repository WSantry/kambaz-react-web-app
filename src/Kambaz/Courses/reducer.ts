import { createSlice } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../Database"; 
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: initialCourses,  
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: newCourse }) => {
      const courseToAdd = {
        ...newCourse,
        _id: uuidv4(), 
      };
      state.courses.push(courseToAdd);
    },

    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((course) => course._id !== courseId);
    },

    updateCourse: (state, { payload: updatedCourse }) => {
      state.courses = state.courses.map((course) =>
        course._id === updatedCourse._id ? updatedCourse : course
      );
    },
  },
});

export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;

export default coursesSlice.reducer;