import * as React from "react";
import TaskList from "../TaskList/TaskList";
import { TaskStatus } from "../../common";
import { Container, Grid } from "@material-ui/core";

const KanbanBoard = () => {
  const grid = (type: TaskStatus) => {
    return (
      <Grid item xs={4}>
        <TaskList type={type} key={type} title={type} />
      </Grid>
    );
  };
  return (
    <Container>
      <Grid container spacing={1}>
        {Object.values(TaskStatus).map((type) => grid(type))}
      </Grid>
    </Container>
  );
};

export default KanbanBoard;
