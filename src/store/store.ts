import { createStore } from 'redux';
import itemListReducer from './reducer';

const store = createStore<IRootState, any, any, any>(itemListReducer);

export default store;