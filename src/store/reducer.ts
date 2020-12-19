import {TaskStatus, TaskActions} from "../common"

const initialState: IRootState = {
    tasks: [
    {
      id: 1,
      title: "item 1",
      status: TaskStatus.ToDo
    },
    {
      id: 2,
      title: "item 2",
      status: TaskStatus.Doing
    },
    {
      id: 3,
      title: "item 3",
      status: TaskStatus.Done
    }
  ],
}

const itemListReducer = (
    state: IRootState = initialState,
    action: TaskAction
  ): IRootState => {
    console.log('reducer!', state, action)
    switch (action.type) {
      case TaskActions.Create:
        const newItem: ITask = {
          id: Math.random(), 
          title: action.payload.taskTitle,
          status: TaskStatus.ToDo
        }
        return {
          ...state,
          tasks: state.tasks.concat(newItem),
        }
      case TaskActions.SetStatus:
        console.log('updating task: ', action.payload)
        const {taskId, status} = action.payload
        const updatedTasks: ITask[] = state.tasks.map(
          task => task.id === taskId ? {...task, status} : task
        )
        return {
          ...state,
          tasks: updatedTasks
        }
        case TaskActions.Delete:
        const newTasks: ITask[] = state.tasks.filter(
          item => item.id !== action.payload.taskId
        )
        return {
          ...state,
          tasks: newTasks
        }
    }
    return state
  }
  
  export default itemListReducer