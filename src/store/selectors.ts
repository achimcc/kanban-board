import { TaskStatus } from "../common";

const taskSelector = (status: TaskStatus) => (store: IRootState) =>
  store.ui.status[status].map((id: number) => ({
    id,
    status: status,
    ...store.data.tasks.byIds[id],
  }));
export { taskSelector };
