interface ITask {
  id: string;
  title: string;
  status: import("./common").TaskStatus;
}

type Actions = "CREATE" | "SET_STATUS" | "DELETE";

interface IActionCreate {
  type: "CREATE";
  title: string;
  id: string;
}

interface IActionSetStatus {
  type: "SET_STATUS";
  id: string;
  status: import("./common").TaskStatus;
  order: ?number;
}

interface IActionDelete {
  type: "DELETE";
  id: string;
}

type TaskAction = IActionCreate | IActionSetStatus | IActionDelete;

type TasksState = {
  tasks: {
    byIds: Object<ITask>;
    allIds: Array<string>;
  };
};

type UIState = {
  taskStatus: Object<Array<number>>;
  updateId: string;
};

interface IRootState {
  data: TasksState;
  ui: UISTate;
}

interface IMyInterface {
  Payload?: object;
  [key: string]: boolean | string | number | Date;
}

type DispatchType = (args: TaskAction) => TaskAction;
