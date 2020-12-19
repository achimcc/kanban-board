interface ITask {
  id: number
  title: string
  status: TaskStatus
}
  
interface IRootState {
  data: TasksState
  ui: UISTate
}

interface ITaskStatus {
  TaskStatus: string
}

type TasksState = {
  tasks: {
    byIds: Object<any>,
    allIds: Array<number>
  },
}

type UIState = {
  status: Object<any>
}
  
type TaskAction = {
  type: TaskActions,
  payload: any
}

type DispatchType = (args: TaskAction) => TaskAction