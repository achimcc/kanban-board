import { TaskStatus } from "../common";

const taskSelector = (store: IRootState, status: TaskStatus) =>
  store.ui.taskStatus[status].map((id: number) => ({
    id,
    status: status,
    ...store.data.tasks.byIds[id],
  }));
export { taskSelector };
