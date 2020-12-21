import { TaskStatus, TaskActions } from "../../common";
import { produce } from "immer";

const initialState: UIState = {
  taskStatus: {
    [TaskStatus.ToDo]: [1],
    [TaskStatus.Doing]: [2],
    [TaskStatus.Done]: [3],
  },
};

const uiReducer = (
  state: UIState = initialState,
  action: TaskAction
): UIState =>
  produce(state, (draft: UIState) => {
    switch (action.type) {
      case TaskActions.Create: {
        const { id } = action.payload;
        draft.taskStatus[TaskStatus.ToDo].push(id);
        break;
      }
      case TaskActions.SetStatus: {
        const { status: taskStatus, taskId } = action.payload;
        Object.values(TaskStatus).forEach((status) => {
          if (taskStatus === status) draft.taskStatus[status].push(taskId);
          else
            draft.taskStatus[status] = draft.taskStatus[status].filter(
              (id: number) => id !== taskId
            );
        });
        break;
      }
      case TaskActions.Delete: {
        const { taskId } = action.payload;
        Object.values(TaskStatus).forEach(
          (status) =>
            (draft.taskStatus[status] = draft.taskStatus[status].filter(
              (id: number) => id !== taskId
            ))
        );
        break;
      }
    }
  });

export default uiReducer;
