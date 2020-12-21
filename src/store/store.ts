import { combineReducers, createStore } from "redux";
import tasksReducer from "./tasks/tasksReducer";
import uiReducer from "./ui/uiReducer";

const store = createStore<IRootState, any, any, any>(
  combineReducers({
    data: tasksReducer,
    ui: uiReducer,
  })
);

export default store;
