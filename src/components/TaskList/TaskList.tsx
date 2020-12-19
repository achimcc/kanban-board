import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import Task from "./Task";
import { TaskStatus } from "../../common";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

interface Props {
  type: TaskStatus;
  title: string;
}

const TaskList = ({ type, title }: Props) => {
  const classes = useStyles();
  const tasks = useSelector((store: IRootState) =>
    store.tasks.filter((task: ITask) => task.status === type)
  );
  return (
    <Paper>
      <div className={classes.root}>
        <Typography variant="h6" align="center">
          {title}
        </Typography>
        <List component="nav" aria-label="main mailbox folders">
          {tasks.map((task: ITask) => (
            <Task task={task} key={task.id} />
          ))}
        </List>
      </div>
    </Paper>
  );
};

export default TaskList;
