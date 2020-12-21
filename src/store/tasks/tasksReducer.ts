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
      case "CREATE": {
        const { title, id } = action;
        draft.tasks.byIds[id] = { id, title };
        draft.tasks.allIds.push(id);
        break;
      }
      case "DELETE":
        const { id: idToDelete } = action;
        delete draft.tasks.byIds[idToDelete];
        draft.tasks.allIds = draft.tasks.allIds.filter(
          (id) => id !== idToDelete
        );
        break;
    }
  });

export default tasksReducer;
