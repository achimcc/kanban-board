interface ITask {
  id: number;
  title: string;
  status: import("./common").TaskStatus;
}

type Actions = "CREATE" | "SET_STATUS" | "DELETE";

interface IActionCreate {
  type: "CREATE";
  title: string;
  id: number;
}

interface IActionSetStatus {
  type: "SET_STATUS";
  id: number;
  status: import("./common").TaskStatus;
}

interface IActionDelete {
  type: "DELETE";
  id: number;
}

type TaskAction = IActionCreate | IActionSetStatus | IActionDelete;

type TasksState = {
  tasks: {
    byIds: Object<ITask>;
    allIds: Array<number>;
  };
};

type UIState = {
  taskStatus: Object<Array<number>>;
};

interface IRootState {
  data: TasksState;
  ui: UISTate;
}

type DispatchType = (args: TaskAction) => TaskAction;
