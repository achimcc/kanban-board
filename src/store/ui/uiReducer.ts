import { TaskStatus } from "../../common";
import { produce } from "immer";
import { nanoid } from "nanoid";

const initialState: UIState = {
  taskStatus: {
    [TaskStatus.ToDo]: [1],
    [TaskStatus.Doing]: [2],
    [TaskStatus.Done]: [3],
  },
  updateId: nanoid(6),
};

const uiReducer = (
  state: UIState = initialState,
  action: TaskAction
): UIState =>
  produce(state, (draft: UIState) => {
    console.log(action);
    switch (action.type) {
      case "CREATE": {
        const { id } = action;
        draft.taskStatus[TaskStatus.ToDo].push(id);
        break;
      }
      case "SET_STATUS": {
        const {
          status: taskStatus,
          id: idToUpdate,
          order = undefined,
        } = action;
        Object.values(TaskStatus).forEach((status) => {
          draft.taskStatus[status] = draft.taskStatus[status].filter(
            (id: string) => id !== idToUpdate
          );
          if (taskStatus === status) {
            console.log("###order:", order);
            if (order || order === 0) {
              console.log("inserting");
              draft.taskStatus[status].splice(order, 0, idToUpdate);
              console.log(draft.taskStatus[status]);
            } else draft.taskStatus[status].push(idToUpdate);
          }
        });
        draft.updateId = nanoid(6);
        break;
      }
      case "DELETE": {
        const { id: idToDelete } = action;
        Object.values(TaskStatus).forEach(
          (status) =>
            (draft.taskStatus[status] = draft.taskStatus[status].filter(
              (id: string) => id !== idToDelete
            ))
        );
        break;
      }
    }
  });

export default uiReducer;
