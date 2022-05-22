import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "../../hooks/redux.hook";
import { Todo } from "../../models/todo.model";
import { actionSetTodo } from "../../redux/reducers/todo.reducer";

type Props = {
  todoList: Todo[];
  handleUpdateTodo: (id: string, data: Todo) => void;
  handleRemoveTodo: (id: string) => void;
  handleCheckTodo: (id: string, isCheck: boolean) => void;
  handleShowTodo: (id: string, isShow: boolean) => void;
  handleRemoveTodoList: (array:Todo[]) => void;

};

const createSchema = () =>
  yup.object().shape({
    todos: yup.array().of(
      yup.object().shape({
        name: yup.string().required("You must typing todo's title"),
      })
    ),
  });

function ListToDo({
  todoList,
  handleUpdateTodo,
  handleRemoveTodo,
  handleCheckTodo,
  handleShowTodo,
  handleRemoveTodoList
}: Props) {
  const schema = createSchema();
  const dispatch = useAppDispatch();
  const [list, setList] = useState<Todo[]>([]);
  const [count, setCount] = useState<number>(0);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    clearErrors,
    watch,
    getValues,
    setValue,
    control,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: { prioririty: "low" },
    mode: "onChange",
  });
  watch(["name", "date", "priority", "description", "todos"]);
  const { fields, append, remove } = useFieldArray({
    name: "todos",
    control,
  });

  useEffect(() => {
    setList(todoList);
    const countTodo = todoList.filter((todo) => todo.isDone);
    setCount(countTodo.length);
  }, [todoList]);

  useEffect(() => {
    setValue("todos", list);
  }, [list]);

  const handleShow = (id: string, value: boolean) => {
    // setValue(`todos.${index}.isShow`, !getValues(`todos.${index}.isShow`));
    handleShowTodo(id, value);
  };

  const handleDeleteTodo = (id: string) => {
    handleRemoveTodo(id);
  };

  const handleDeleteList = () => {
    handleRemoveTodoList(todoList.filter((todo) => todo.isDone))
  };

  const handleUpdate = (id: string, data: Todo) => {
    handleUpdateTodo(id, data);
  };

  const handleSearch = ({ target }: any) => {
    if (target.value !== "") {
      const func = _.debounce(() => {
        const filteredData = todoList.filter((entry) =>
          entry.name?.toLowerCase().includes(target.value?.toLowerCase())
        );
        setList(filteredData);
      }, 500);
      func();
    } else {
      setList(todoList);
    }
  };

  return (
    <>
      <Box className="list_task_container">
        <Typography className="title">To Do List</Typography>
        <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
          <OutlinedInput
            placeholder="Search ..."
            error={!!errors?.search}
            {...register(`search`, { onChange: handleSearch })}
            onMouseDown={() => clearErrors(`search`)}
          />
          {errors.search && <FormHelperText error>{errors.search?.message}</FormHelperText>}
        </FormControl>

        {fields?.map((field, index) => (
          <Box className="list" key={field?.id}>
            <Card className="todo_container">
              <CardContent className="todo">
                <Stack direction={"row"} justifyContent="space-between" alignItems={"center"}>
                  <FormControlLabel
                    control={<Checkbox checked={!!getValues(`todos.${index}.isDone`) || false} />}
                    label={getValues(`todos.${index}.name`) || ""}
                    {...register(`todos.${index}.isDone`, {
                      onChange: ({ target }) =>
                        handleCheckTodo(getValues(`todos.${index}.id`), target.checked),
                    })}
                  />
                  <div className="button_group">
                    <Button
                      className="detail"
                      onClick={() =>
                        handleShow(
                          getValues(`todos.${index}.id`),
                          !getValues(`todos.${index}.isShow`)
                        )
                      }
                    >
                      Detail
                    </Button>
                    <Button
                      className="remove"
                      onClick={() => {
                        handleDeleteTodo(getValues(`todos.${index}.id`));
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </Stack>
              </CardContent>
            </Card>
            {getValues(`todos.${index}.isShow`) && (
              <Card className="todo_container detail">
                <CardContent className="todo">
                  <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
                    <OutlinedInput
                      placeholder="Add new task ..."
                      error={!!errors.todos?.[index]?.name}
                      {...register(`todos.${index}.name`)}
                      onMouseDown={() => clearErrors(`todos.${index}.name`)}
                    />
                    {errors.todos?.[index].name && (
                      <FormHelperText error>{errors.todos?.[index].name?.message}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
                    <FormLabel required>Description</FormLabel>
                    <textarea rows={5} {...register(`todos.${index}.description`)} />
                  </FormControl>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth size="small" sx={{ mt: 0.5 }} className="time">
                        <FormLabel required sx={{ marginBottom: "0.3rem" }}>
                          Due Date
                        </FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            inputFormat="dd-MM-yyyy"
                            disablePast
                            value={getValues(`todos.${index}.date`) || null}
                            // placeholder="Nhập ngày đi"
                            onChange={(newValue) => {
                              setValue(`todos.${index}.date`, newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                {...register(`todos.${index}.date`)}
                              />
                            )}
                          />
                        </LocalizationProvider>
                        {errors.todos?.[index]?.date && (
                          <FormHelperText error>
                            {errors.todos?.[index].date?.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
                        <FormLabel required sx={{ marginBottom: "0.3rem" }}>
                          Priority
                        </FormLabel>
                        <Select
                          {...register("priority", {
                            onChange: ({ target }) => {},
                          })}
                          onMouseDown={() => clearErrors("priority")}
                          error={!!errors.todos?.[index].priority}
                          value={getValues(`todos.${index}.priority`) || ""}
                          // displayEmpty
                        >
                          <MenuItem value={"low"}>Low</MenuItem>
                          <MenuItem value={"normal"}>Normal</MenuItem>
                          <MenuItem value={"hight"}>Hight</MenuItem>
                        </Select>
                        {errors.todos?.[index].priority && (
                          <FormHelperText error>
                            {errors.todos?.[index].priority?.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    className={isValid ? "button" : "button disable"}
                    disabled={!isValid}
                    onClick={() =>
                      handleUpdate(getValues(`todos.${index}.id`), getValues(`todos.${index}`))
                    }
                  >
                    Update
                  </Button>
                </CardContent>
              </Card>
            )}
          </Box>
        ))}
      </Box>
      {count > 1 && (
        <Box className="bulk">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <p>Bulk Action:</p>
            <div className="button_group">
              <Button className="detail">Done</Button>
              <Button className="remove" onClick={handleDeleteList}>
                Remove
              </Button>
            </div>
          </Stack>
        </Box>
      )}
    </>
  );
}

export default ListToDo;
