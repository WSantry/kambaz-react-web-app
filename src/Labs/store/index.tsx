import { configureStore } from "@reduxjs/toolkit";

// 1) Hello Redux
import helloReducer from "../Lab4/ReduxExamples/HelloRedux/helloReducer";

// 2) Counter Redux
import counterReducer from "../Lab4/ReduxExamples/CounterRedux/counterReducer";

// 3) Add Redux
import addReducer from "../Lab4/ReduxExamples/AddRedux/addReducer";

// 4) Todos Redux
import todosReducer from "../Lab4/ReduxExamples/todos/todosReducer";

const store = configureStore({
  reducer: {
    helloReducer,
    counterReducer,
    addReducer,
    todosReducer,
  },
});

// Typescript helpers (optional)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
