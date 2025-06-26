import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Quiz     { _id: string; [k: string]: any; }
export interface Question { _id: string; [k: string]: any; }

interface State {
  quizzes:   Quiz[];
  questions: Question[];
  /** Holds the quiz currently being edited (unsaved draft). */
  draftQuiz: Quiz | null;
}
const initialState: State = {
  quizzes:   [],
  questions: [],
  draftQuiz: null,
};

const slice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    /* ── quizzes list ────────────────────────────── */
    setQuizzes: (s, { payload }: PayloadAction<Quiz[]>) => {
      s.quizzes = payload;
    },
    addQuiz: (s, { payload }: PayloadAction<Quiz>) => {
      s.quizzes.push({
        ...payload,
        _id: payload._id ?? uuidv4(),
      });
    },
    updateQuiz: (s, { payload }: PayloadAction<Quiz>) => {
      s.quizzes = s.quizzes.map(q =>
        q._id === payload._id ? { ...q, ...payload } : q
      );
    },
    deleteQuiz: (s, { payload: id }: PayloadAction<string>) => {
      s.quizzes = s.quizzes.filter(q => q._id !== id);
    },

    /* ── questions of ONE quiz ───────────────────── */
    setQuestions: (s, { payload }: PayloadAction<Question[]>) => {
      s.questions = payload;
    },
    addQuestion: (s, { payload }: PayloadAction<Question>) => {
      s.questions.push({
        ...payload,
        _id: payload._id ?? uuidv4(),
      });
    },
    updateQuestion: (s, { payload }: PayloadAction<Question>) => {
      s.questions = s.questions.map(q =>
        q._id === payload._id ? payload : q
      );
    },
    deleteQuestion: (s, { payload: id }: PayloadAction<string>) => {
      s.questions = s.questions.filter(q => q._id !== id);
    },

    /* ── editing draft (unsaved quiz) ─────────────── */
    setDraftQuiz: (s, { payload }: PayloadAction<Quiz>) => {
      s.draftQuiz = { ...payload };
    },
    updateDraftQuiz: (s, { payload }: PayloadAction<Partial<Quiz>>) => {
      if (s.draftQuiz) {
        s.draftQuiz = { ...s.draftQuiz, ...payload };
      }
    },
    clearDraftQuiz: (s) => {
      s.draftQuiz = null;
    },
  },
});

export const {
  /* quizzes */
  setQuizzes, addQuiz, updateQuiz, deleteQuiz,
  /* questions */
  setQuestions, addQuestion, updateQuestion, deleteQuestion,
  /* draft */
  setDraftQuiz, updateDraftQuiz, clearDraftQuiz,
} = slice.actions;

export default slice.reducer;
