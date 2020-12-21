import { TaskActions } from "../../common";
import { produce } from "immer";

const initialState: TasksState = {
  tasks: {
    byIds: {
      1: {
        title: "item 1",
      },
      2: {
        title: "item 2",
      },
      3: {
        title: "item 3",
      },
    },
    allIds: [1, 2, 3],
  },
};

const tasksReducer = (
  state: TasksState = initialState,
  action: TaskAction
): TasksState =>
  produce(state, (draft: TasksState) => {
    switch (action.type) {
      case TaskActions.Create: {
        const { taskTitle, id } = action.payload;
        draft.tasks.byIds[id] = { id, title: taskTitle };
        draft.tasks.allIds.push(id);
        break;
      }
      case TaskActions.Delete:
        const { taskId } = action.payload;
        delete draft.tasks.byIds[taskId];
        draft.tasks.allIds = draft.tasks.allIds.filter((id) => id !== taskId);
        break;
    }
  });

export default tasksReducer;
