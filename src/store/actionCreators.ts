import {TaskActions, TaskStatus} from "../common"

export function addTask(taskTitle: string):TaskAction {
  const id = Math.random();
  const action = {
    type: TaskActions.Create,
    payload: {taskTitle, id}
  }
  return action
}

export function updateTask(taskId: Number, status: TaskStatus):TaskAction {
  const action: TaskAction = {
    type: TaskActions.SetStatus,
    payload: {status, taskId}
  }
  return action
}

export function removeTask(taskId: Number):TaskAction {
  const action: TaskAction = {
    type: TaskActions.Delete,
    payload: {taskId}
  }
  return action
}

