import { createSlice } from "@reduxjs/toolkit";
import { modules as initialModules } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const modulesSlice = createSlice({
  name: "modules",
  initialState: { modules: initialModules },
  reducers: {
    setModules: (state, { payload }) => { state.modules = payload; },
    addModule: (state, { payload }) => {
      state.modules.push({ ...payload, _id: uuidv4(), lessons: [] });
    },
    deleteModule: (state, { payload }) => {
      state.modules = state.modules.filter((m:any)=>m._id !== payload);
    },
    updateModule: (state, { payload }) => {
      state.modules = state.modules.map((m:any)=> m._id===payload._id ? payload : m);
    },
    editModule: (state, { payload }) => {
      state.modules = state.modules.map((m:any)=> m._id===payload ? { ...m, editing:true } : m);
    },
  },
});
export const { setModules, addModule, deleteModule, updateModule, editModule } = modulesSlice.actions;
export default modulesSlice.reducer;