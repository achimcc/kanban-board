import {TaskStatus, TaskActions} from "../../common"

const initialState: UIState = {
  status: {
    [TaskStatus.ToDo]: [1],
    [TaskStatus.Doing]: [2],
    [TaskStatus.Done]: [3],
  }
}

interface IStatus {
  [TaskStatus.ToDo]: Array<number>
  [TaskStatus.Doing]: Array<number>
  [TaskStatus.Done]: Array<number>
}

const uiReducer = (
    state: UIState = initialState,
    action: TaskAction
  ): UIState => {
    switch (action.type) {
      case TaskActions.Create: {
        console.log('ui create', action.payload)
        const {id} = action.payload;
        const newStatus = {...state.status, [TaskStatus.ToDo]: state.status[TaskStatus.ToDo].concat(id)}
        return {
          ...state,
          status: newStatus
        }
      }
      case TaskActions.SetStatus:
        {
          const {status, taskId} = action.payload
          const newStatus = {...state.status}
          Object.values(TaskStatus).reduce<IStatus>((acc:IStatus, value:TaskStatus)=>{
            if(status!==value) acc[value]=state.status[value].filter((id:number)=>id!==taskId)
            else acc[value]=state.status[value].concat(taskId)
            return acc
          }, newStatus)
          return {
            ...state,
            status: newStatus
          }
        } 
      case TaskActions.Delete:
        const {taskId} = action.payload
        const newStatus = {...state.status}
        Object.values(TaskStatus).forEach(status=>newStatus[status]=newStatus[status].filter((id:number)=>id!==taskId))
        return {
          ...state,
          status: newStatus
        }
      }
      return state
  }
  
export default uiReducer