import {TaskStatus, TaskActions} from "../../common"

const initialState: TasksState = {
  tasks: {
    byIds: {
      1:{
        title: "item 1",
      },
      2: {
        title: "item 2",
       },
      3: {
        title: "item 3",
      }
    },
    allIds: [1,2,3]
  },
  status: {
    [TaskStatus.ToDo]: [1],
    [TaskStatus.Doing]: [2],
    [TaskStatus.Done]: [3],
  }
}

const itemListReducer = (
    state: TasksState = initialState,
    action: TaskAction
  ): TasksState => {
    switch (action.type) {
      case TaskActions.Create: {
        const newId = Math.random();
        const newTasks = {[newId]: {title: action.payload.taskTitle}, ...state.tasks}
        const newStatus = state.status[TaskStatus.ToDo].concat(newId)
        return {
          ...state,
          tasks: newTasks,
        }
      }
      case TaskActions.SetStatus:
        console.log('updating task: ', action.payload)
        const {taskId, status} = action.payload
        
        return {
          ...state,
        }
        case TaskActions.Delete:
        return {
          ...state
        }
    }
    return state
  }
  
  export default itemListReducer