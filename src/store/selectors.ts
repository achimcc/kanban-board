import { TaskStatus } from "../common";

const taskByIdSelector = (id: string) => (store: IRootState): ITask => {
  const status =
    Object.values(TaskStatus).find((status) =>
      store.ui.taskStatus[status].includes(id)
    ) || TaskStatus.ToDo;
  const taskData = store.data.tasks.byIds[id];
  return {
    id,
    status,
    ...taskData,
  };
};

export { taskByIdSelector };
