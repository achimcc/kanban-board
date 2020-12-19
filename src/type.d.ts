interface ITask {
  id: number
  title: string
  status: TaskStatus
}
  
interface IRootState {
  tasks: ITask[]
}

type TasksState = {
  tasks: ITask[]
}
  
type TaskAction = {
  type: TaskActions,
  payload: any
}

type DispatchType = (args: TaskAction) => TaskAction