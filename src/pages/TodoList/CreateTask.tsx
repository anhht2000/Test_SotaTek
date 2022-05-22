import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React from "react";
import { useForm } from "react-hook-form";
import { Todo } from "../../models/todo.model";
import * as yup from "yup";

type Props = { handleAddTodo: (data: Todo) => void };

const createSchema = () =>
  yup.object().shape({
    name: yup.string().required("You must typing todo's title"),
  });

function CreateTask({ handleAddTodo }: Props) {
  const schema = createSchema();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    clearErrors,
    watch,
    getValues,
    setValue,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: { priority: "normal", date: new Date() },
    mode: "onChange",
  });
  watch(["name", "date", "priority", "description"]);

  const onSubmit = (value: Todo) => {
    handleAddTodo(value);
    setValue("name", "");
    setValue("description", "");
    setValue("data", new Date());
    setValue("priority", "normal");
  };
  return (
    <Box className="creat_task_container" component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Typography className="title">New Task</Typography>
      <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
        <OutlinedInput
          placeholder="Add new task ..."
          error={!!errors?.name}
          {...register(`name`)}
          onMouseDown={() => clearErrors(`name`)}
        />
        {errors.name && <FormHelperText error>{errors.name?.message}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
        <FormLabel required>Description</FormLabel>
        <textarea rows={5} {...register("description")} />
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
                value={getValues("date") || null}
                // placeholder="Nhập ngày đi"
                onChange={(newValue) => {
                  setValue("date", newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" {...register("date")} />
                )}
              />
            </LocalizationProvider>
            {errors.date && <FormHelperText error>{errors.date?.message}</FormHelperText>}
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
              error={!!errors.priority}
              value={getValues("priority") || ""}
              // displayEmpty
            >
              <MenuItem value={"low"}>Low</MenuItem>
              <MenuItem value={"normal"}>Normal</MenuItem>
              <MenuItem value={"hight"}>Hight</MenuItem>
            </Select>
            {errors.date && <FormHelperText error>{errors.date?.message}</FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
      <Button className="button" type="submit">
        Add
      </Button>
    </Box>
  );
}

export default CreateTask;
