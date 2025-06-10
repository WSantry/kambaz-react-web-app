import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: [] as any[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, { payload }) => {
      state.assignments = payload;
    },
    addAssignment: (state, { payload }) => {
      state.assignments.push({
        ...payload,
        _id: payload._id ?? uuidv4(),
      });
    },
    deleteAssignment: (state, { payload: id }) => {
      state.assignments = state.assignments.filter(a => a._id !== id);
    },
    updateAssignment: (state, { payload }) => {
      state.assignments = state.assignments.map(a =>
        a._id === payload._id ? payload : a
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
