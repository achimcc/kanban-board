interface ITask {
  id: number;
  title: string;
  status: TaskStatus;
}

type UIState = {
  [TaskStatus.ToDo]: Array<number>;
  [TaskStatus.Doing]: Array<number>;
  [TaskStatus.Done]: Array<number>;
};

type TasksState = {
  tasks: {
    byIds: Object<Number<Object<TaskData>>>;
    allIds: Array<number>;
  };
};

interface IRootState {
  data: TasksState;
  ui: UISTate;
}

interface TaskData {
  title: string;
}

interface ITaskStatus {
  TaskStatus: string;
}

type TaskAction = {
  type: TaskActions;
  payload: any;
};

type DispatchType = (args: TaskAction) => TaskAction;
