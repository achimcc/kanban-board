import { TaskActions } from "../../common";

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

const taskReducer = (
  state: TasksState = initialState,
  action: TaskAction
): TasksState => {
  switch (action.type) {
    case TaskActions.Create: {
      const { taskTitle, id } = action.payload;
      const newTasks = { ...state.tasks.byIds, [id]: { title: taskTitle } };
      const newIds = state.tasks.allIds.concat(id);
      return {
        ...state,
        tasks: { byIds: newTasks, allIds: newIds },
      };
    }
    case TaskActions.Delete:
      const { taskId } = action.payload;
      const newTasks = { ...state.tasks.byIds };
      const newIds = state.tasks.allIds.filter((id) => id !== taskId);
      delete newTasks[taskId];
      return {
        ...state,
        tasks: { byIds: newTasks, allIds: newIds },
      };
  }
  return state;
};

export default taskReducer;
