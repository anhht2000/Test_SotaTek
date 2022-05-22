import { Box, Container, Grid, unstable_useId } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Todo } from "../../models/todo.model";
import CreateTask from "./CreateTask";
import ListToDo from "./ListTodo";
import "./style.scss";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { actionSetTodo, getTodos } from "../../redux/reducers/todo.reducer";

type Props = {};

function TodoList({}: Props) {
  const todos = useAppSelector(getTodos);
  const dispatch = useAppDispatch();
  const handleAddTodo = (data: Todo) => {
    dispatch(
      actionSetTodo(
        [...todos, { ...data, id: uuidv4() }].sort(function (a: any, b: any) {
          return new Date(a.date).valueOf() - new Date(b.date).valueOf();
        })
      )
    );
  };
  const handleUpdateTodo = (id: string, data: Todo) => {
    const index = todos.findIndex((todo: Todo) => todo.id === id);
    let newData: Todo[] = todos;
    newData = [
      ...newData.slice(0, index),
      { ...newData[index], ...data },
      ...newData.slice(index + 1),
    ];
    dispatch(actionSetTodo(newData));
  };
  const handleRemoveTodo = (id: string) => {
    dispatch(actionSetTodo(todos.filter((todo: Todo) => todo.id !== id)));
  };

  const handleRemoveTodoList = (array: Todo[]) => {
    const newData = todos.filter((val: Todo) => val.isDone !== true);
    console.log("aaa", array, newData);

    dispatch(actionSetTodo(newData));
  };
  const handleCheckTodo = (id: string, isCheck: boolean) => {
    const index = todos.findIndex((todo: Todo) => todo.id === id);
    let newData: Todo[] = todos.map((todo: Todo) => ({ ...todo }));
    newData = [
      ...newData.slice(0, index),
      { ...newData[index], isDone: isCheck },
      ...newData.slice(index + 1),
    ];
    dispatch(actionSetTodo(newData));
  };

  const handleShowTodo = (id: string, isShow: boolean) => {
    const index = todos.findIndex((todo: Todo) => todo.id === id);
    let newData: Todo[] = todos.map((todo: Todo) => ({ ...todo, isShow: false }));
    newData = [
      ...newData.slice(0, index),
      { ...newData[index], isShow },
      ...newData.slice(index + 1),
    ];
    dispatch(actionSetTodo(newData));
  };

  return (
    <Box className="container">
      <Grid container>
        <Grid item xs={12} lg={5} className="border">
          <CreateTask handleAddTodo={handleAddTodo as any} />
        </Grid>
        <Grid item xs={12} lg={7} className="border">
          <ListToDo
            todoList={todos}
            handleUpdateTodo={handleUpdateTodo}
            handleRemoveTodo={handleRemoveTodo}
            handleCheckTodo={handleCheckTodo}
            handleShowTodo={handleShowTodo}
            handleRemoveTodoList={handleRemoveTodoList}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TodoList;
