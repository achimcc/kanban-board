interface ITask {
  id: number
  title: string
  status: TaskStatus
}
  
interface IRootState {
  tasks: TasksState
}

type TasksState = {
  tasks: ITask[]
}
  
type TaskAction = {
  type: TaskActions,
  payload: any
}

type DispatchType = (args: TaskAction) => TaskAction