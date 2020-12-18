import { combineReducers, createStore } from 'redux';
import itemListReducer from './taskList/reducer';

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        tasks: itemListReducer
}));

export default store;