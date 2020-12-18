import * as React from "react";
import { useDispatch } from "react-redux";

import { updateTask, removeTask } from "../../store/taskList/actionCreators";
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
  task: ITask;
}

enum Direction {
  Left,
  Right,
}

const moveTask = (task: ITask, direction: Direction) => {
  const statusArr = Object.values(TaskStatus);
  const statusIndex =
    statusArr.indexOf(task.status) + (direction === Direction.Left ? -1 : 1);
  const status =
    statusIndex > -1 && statusIndex < 3 ? statusArr[statusIndex] : task.status;
  return updateTask(task.id, status);
};

const Task = ({ task }: Props) => {
  const dispatch = useDispatch();
  return (
    <ListItem>
      <ListItemIcon>
        {task.status !== TaskStatus.ToDo && (
          <Button onClick={() => dispatch(moveTask(task, Direction.Left))}>
            <SkipPrevious />
          </Button>
        )}
      </ListItemIcon>
      <ListItemText primary={task.title} />
      <ListItemIcon>
        {task.status == TaskStatus.Done ? (
          <Button onClick={() => dispatch(removeTask(task.id))}>
            <CloseIcon />
          </Button>
        ) : (
          <Button onClick={() => dispatch(moveTask(task, Direction.Right))}>
            <SkipNextIcon />
          </Button>
        )}
      </ListItemIcon>
    </ListItem>
  );
};

export default Task;
