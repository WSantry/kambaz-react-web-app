import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  modules: [] as any[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, { payload }) => {
      state.modules = payload;
    },
    addModule: (state, { payload }) => {
      state.modules.push({
        _id: payload._id ?? uuidv4(),
        lessons: payload.lessons ?? [],
        name: payload.name,
        course: payload.course,
      });
    },
    deleteModule: (state, { payload: id }) => {
      state.modules = state.modules.filter(m => m._id !== id);
    },
    updateModule: (state, { payload }) => {
      state.modules = state.modules.map(m =>
        m._id === payload._id ? payload : m
      );
    },
    editModule: (state, { payload: id }) => {
      state.modules = state.modules.map(m =>
        m._id === id ? { ...m, editing: true } : m
      );
    },
  },
});

export const {
  setModules,
  addModule,
  deleteModule,
  updateModule,
  editModule,
} = modulesSlice.actions;
export default modulesSlice.reducer;
