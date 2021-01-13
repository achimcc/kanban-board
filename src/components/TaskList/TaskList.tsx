import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "../../store/index";
import Task from "./Task";
import { TaskStatus } from "../../common";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    minHeight: "14vw",
  },
}));

interface Props {
  status: TaskStatus;
  title: string;
}

const TaskList = ({ status, title }: Props) => {
  const classes = useStyles();
  const taskIds = useSelector(
    (store: IRootState) => store.ui.taskStatus[status]
  );
  const updateId = useSelector((store: IRootState) => store.ui.updateId);
  return (
    <Paper>
      <div className={classes.root} id={`${status}`}>
        <Typography variant="h6" align="center">
          {title}
        </Typography>
        <List component="nav" aria-label="main mailbox folders">
          {taskIds.map((taskId: string) => (
            <Task taskId={taskId} key={`${taskId}`} />
          ))}
        </List>
      </div>
    </Paper>
  );
};

export default TaskList;
