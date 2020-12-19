import { combineReducers, createStore } from 'redux';
import taskReducer from './tasks/reducer';
import uiReducer from './ui/reducer';

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        data: taskReducer,
        ui: uiReducer
}));

export default store;