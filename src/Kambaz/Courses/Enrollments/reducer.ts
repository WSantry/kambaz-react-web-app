import { createSlice } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../../Database";

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState: {
    enrollments: initialEnrollments,
  },
  reducers: {
    // no other reducer actions yet
  },
});

export default enrollmentsSlice.reducer;