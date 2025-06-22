import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Quiz      { _id:string; [k:string]:any }
export interface Question  { _id:string; [k:string]:any }

interface State{
  quizzes:   Quiz[];
  questions: Question[];
}
const initialState: State = { quizzes:[], questions:[] };

const slice = createSlice({
  name:"quizzes",
  initialState,
  reducers:{
    setQuizzes:(s,{payload}:PayloadAction<Quiz[]>)=>{s.quizzes=payload;},
    addQuiz:(s,{payload}:PayloadAction<Quiz>)=>{
      s.quizzes.push({...payload,_id:payload._id??uuidv4()});
    },
    updateQuiz:(s,{payload}:PayloadAction<Quiz>)=>{
      s.quizzes=s.quizzes.map(q=>q._id===payload._id?payload:q);
    },
    deleteQuiz:(s,{payload:id}:PayloadAction<string>)=>{
      s.quizzes=s.quizzes.filter(q=>q._id!==id);
    },
    setQuestions:(s,{payload}:PayloadAction<Question[]>)=>{s.questions=payload;},
    addQuestion:(s,{payload}:PayloadAction<Question>)=>{s.questions.push(payload);},
    updateQuestion:(s,{payload}:PayloadAction<Question>)=>{
      s.questions=s.questions.map(q=>q._id===payload._id?payload:q);},
    deleteQuestion:(s,{payload:id}:PayloadAction<string>)=>{
      s.questions=s.questions.filter(q=>q._id!==id);}
  }
});
export const {
  setQuizzes,addQuiz,updateQuiz,deleteQuiz,
  setQuestions,addQuestion,updateQuestion,deleteQuestion
}=slice.actions;
export default slice.reducer;
