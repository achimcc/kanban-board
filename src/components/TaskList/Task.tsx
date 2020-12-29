import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, removeTask } from "../../store/actionCreators";
import { TaskStatus } from "../../common";

import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { SkipPrevious } from "@material-ui/icons";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  taskId: number;
  status: TaskStatus;
}

enum Direction {
  Left,
  Right,
}

const moveTask = (taskId: number, status: TaskStatus, direction: Direction) => {
  const statusArr = Object.values(TaskStatus);
  const statusIndex =
    statusArr.indexOf(status) + (direction === Direction.Left ? -1 : 1);
  const newStatus =
    statusIndex > -1 && statusIndex < 3 ? statusArr[statusIndex] : status;
  return updateTask(taskId, newStatus);
};

const Task = ({ taskId, status }: Props) => {
  const task = useSelector<IRootState>(
    (store: IRootState): TaskData => store.data.tasks.byIds[taskId]
  );
  const dispatch = useDispatch();
  return (
    <ListItem>
      <ListItemIcon>
        {status !== TaskStatus.ToDo && (
          <Button
            onClick={() => dispatch(moveTask(taskId, status, Direction.Left))}
          >
            <SkipPrevious />
          </Button>
        )}
      </ListItemIcon>
      <ListItemText primary={task.title} />
      <ListItemIcon>
        {status === TaskStatus.Done ? (
          <Button onClick={() => dispatch(removeTask(taskId))}>
            <CloseIcon />
          </Button>
        ) : (
          <Button
            onClick={() => dispatch(moveTask(taskId, status, Direction.Right))}
          >
            <SkipNextIcon />
          </Button>
        )}
      </ListItemIcon>
    </ListItem>
  );
};

export default Task;
