import { combineReducers, createStore } from "redux";
import { useDispatch as _useDispatch } from "react-redux";
import tasksReducer from "./tasks/tasksReducer";
import uiReducer from "./ui/uiReducer";

const store = createStore<IRootState, any, any, any>(
  combineReducers({
    data: tasksReducer,
    ui: uiReducer,
  })
);

function useDispatch() {
  const dispatch = _useDispatch();
  return (action: TaskAction) => {
    dispatch(action);
  };
}

export { store, useDispatch };
