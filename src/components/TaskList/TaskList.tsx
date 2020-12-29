import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import Task from "./Task";
import { TaskStatus } from "../../common";
import Typography from "@material-ui/core/Typography";
import { taskSelector } from "../../store/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

interface Props {
  status: TaskStatus;
  title: string;
}

const TaskList = ({ status, title }: Props) => {
  const classes = useStyles();
  const tasks = useSelector<IRootState, Array<number>>(
    (store) => store.ui.status[status]
  );
  return (
    <Paper>
      <div className={classes.root}>
        <Typography variant="h6" align="center">
          {title}
        </Typography>
        <List component="nav" aria-label="main mailbox folders">
          {tasks.map((taskId: number) => (
            <Task taskId={taskId} key={taskId} status={status} />
          ))}
        </List>
      </div>
    </Paper>
  );
};

export default TaskList;
