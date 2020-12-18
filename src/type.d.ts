interface ITask {
  id: number
  title: string
  status: TaskStatus
}
  
interface IRootState {
  tasks: TasksState
}

interface ITaskStatus {
  TaskStatus: string
}

type TasksState = {
  tasks: {
    byIds: Object<any>,
    allIds: Array<number>
  },
  status: Object<any>
}
  
type TaskAction = {
  type: TaskActions,
  payload: any
}

type DispatchType = (args: TaskAction) => TaskAction