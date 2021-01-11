import * as React from "react";
import { useDispatch } from "../../store/index";
import { TaskStatus } from "../../common";

import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { SkipPrevious, SkipNext, Close } from "@material-ui/icons";

interface Props {
  task: ITask;
}

enum Direction {
  Left,
  Right,
}

const moveTask = (task: ITask, direction: Direction) => {
  const statusArr: Array<TaskStatus> = Object.values(TaskStatus);
  const statusIndex =
    statusArr.indexOf(task.status) + (direction === Direction.Left ? -1 : 1);
  const status = statusArr[statusIndex];
  const type: Actions = "SET_STATUS";
  const action = {
    type,
    id: task.id,
    status,
  };
  return action;
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
        {task.status === TaskStatus.Done ? (
          <Button onClick={() => dispatch({ type: "DELETE", id: task.id })}>
            <Close />
          </Button>
        ) : (
          <Button onClick={() => dispatch(moveTask(task, Direction.Right))}>
            <SkipNext />
          </Button>
        )}
      </ListItemIcon>
    </ListItem>
  );
};

export default Task;
