import { Todo } from "./../../models/todo.model";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: any = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    actionSetTodo: (state, { payload }) => {
      state.todos = payload;
    },
  },
});

// action
export const { actionSetTodo } = todoSlice.actions;

// selector
export const getTodos = (state: RootState) => state.todo.todos;

// reducer
const todoReducer = todoSlice.reducer;


export default todoReducer;
