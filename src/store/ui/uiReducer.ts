import { TaskStatus } from "../../common";
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
      case "CREATE": {
        const { id } = action;
        draft.taskStatus[TaskStatus.ToDo].push(id);
        break;
      }
      case "SET_STATUS": {
        const { status: taskStatus, id: idToUpdate } = action;
        Object.values(TaskStatus).forEach((status) => {
          if (taskStatus === status) draft.taskStatus[status].push(idToUpdate);
          else
            draft.taskStatus[status] = draft.taskStatus[status].filter(
              (id: number) => id !== idToUpdate
            );
        });
        break;
      }
      case "DELETE": {
        const { id: idToDelete } = action;
        Object.values(TaskStatus).forEach(
          (status) =>
            (draft.taskStatus[status] = draft.taskStatus[status].filter(
              (id: number) => id !== idToDelete
            ))
        );
        break;
      }
    }
  });

export default uiReducer;
