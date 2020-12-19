import * as React from "react";
import TaskList from "../taskList/TaskList";
import { TaskStatus } from "../../common";
import { Container, Grid } from "@material-ui/core";

const KanbanBoard = () => {
  const grid = (status: TaskStatus) => {
    return (
      <Grid item xs={4} key={status}>
        <TaskList status={status} key={status} title={status} />
      </Grid>
    );
  };
  return (
    <Container>
      <Grid container spacing={1}>
        {Object.values(TaskStatus).map((status) => grid(status))}
      </Grid>
    </Container>
  );
};

export default KanbanBoard;
