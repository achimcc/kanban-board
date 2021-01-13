import { useDispatch, useSelector } from "../../store/index";
import { TaskStatus } from "../../common";
import { map, switchMap, take, takeUntil } from "rxjs/operators";
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { fromEvent, merge } from "rxjs";
import { useEffect, useState } from "react";
import { taskByIdSelector } from "../../store/selectors";

interface Props {
  taskId: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid black",
    margin: "10px",
  },
}));

const Task = ({ taskId }: Props) => {
  const task = useSelector(taskByIdSelector(taskId));
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    const box = document.querySelector<HTMLDivElement>(
      `#task${task.id}`
    ) as HTMLDivElement;
    const mousedown$ = fromEvent<MouseEvent>(box as Element, "mousedown");
    const mousemove$ = fromEvent<MouseEvent>(document, "mousemove");
    const mouseup$ = fromEvent<MouseEvent>(document, "mouseup");
    const drag$ = mousedown$.pipe(
      switchMap((start) => {
        return merge(
          mousemove$.pipe(
            map((move) => {
              move.preventDefault();
              return {
                type: "move",
                x: move.x - start.x,
                y: move.y - start.y,
              };
            }),
            takeUntil(mouseup$)
          ),
          mouseup$.pipe(
            map((endPos) => {
              return {
                type: "end",
                x: endPos.clientX,
                y: endPos.clientY,
              };
            }),
            take(1)
          )
        );
      })
    );
    drag$.subscribe((pos) => {
      switch (pos.type) {
        case "move":
          box.style.transform = `translate(${pos?.x}px, ${pos?.y}px)`;
          break;
        case "end":
          const path = document
            .elementsFromPoint(pos.x, pos.y)
            .map((el) => el && el.id);
          const tasks = Object.values(TaskStatus);
          const status = tasks.filter((task) => path.includes(task))[0];
          if (status) {
            const type: Actions = "SET_STATUS";
            const TaskBox = document.querySelector(`#${status}`);
            let TaskPos: any;
            if (TaskBox)
              TaskPos = Object.values(
                TaskBox.querySelectorAll('[id^="task"]')
              ).map((div) =>
                Math.abs(
                  div.getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top -
                    pos.y
                )
              );
            const order = TaskPos.indexOf(Math.min(...TaskPos));
            if (status) {
              const action = {
                type,
                id: task.id,
                status: status,
                order,
              };
              dispatch(action);
            }
          }
          box.style.transform = `translate(0px, 0px)`;
      }
    });
  }, []);

  return (
    <div id={`task${task.id}`} className={classes.root}>
      <ListItem>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary={task.title} />
        <ListItemIcon>
          {task.status === TaskStatus.Done && (
            <Button onClick={() => dispatch({ type: "DELETE", id: task.id })}>
              <Close />
            </Button>
          )}
        </ListItemIcon>
      </ListItem>
    </div>
  );
};

export default Task;
