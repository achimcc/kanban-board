import React from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Grid, Box } from "@material-ui/core";
import { addTask } from "../../store/taskList/actionCreators";

export default function SubmitTask() {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.currentTarget.value);
  };
  const handleClick = () => {
    const action = addTask(taskName);
    dispatch(action);
    setTaskName("");
  };

  return (
    <Box m="auto" alignItems="center" justifyContent="center">
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="standard-name"
            label="Task Name"
            value={taskName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item container xs={6} alignItems="center" justify="center">
          <Box p={2}>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Submit Task
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
