import { createSlice } from "@reduxjs/toolkit";
import { modules as seedModules } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  modules: seedModules,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    /* --- CREATE ---------------------------------------------------- */
    addModule: (state, { payload }) => {
      const newModule: any = {
        /* keep server-assigned id if present, otherwise generate one */
        _id: payload._id ?? uuidv4(),
        lessons: payload.lessons ?? [],
        name: payload.name,
        course: payload.course,
      };
      state.modules = [...state.modules, newModule] as any;
    },

    /* --- DELETE ---------------------------------------------------- */
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter((m: any) => m._id !== moduleId);
    },

    /* --- UPDATE (name/editing flag, etc.) -------------------------- */
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },

    /* --- TOGGLE EDIT MODE ----------------------------------------- */
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },

    /* --- SERVER SYNC (set on fetch) -------------------------------- */
    setModules: (state, { payload: modules }) => {
      state.modules = modules;
    },
  },
});

export const {
  addModule,
  deleteModule,
  updateModule,
  editModule,
  setModules,
} = modulesSlice.actions;

export default modulesSlice.reducer;
