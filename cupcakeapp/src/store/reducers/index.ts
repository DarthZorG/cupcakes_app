import {AlertReducer} from './AlertReducer';
import {AuthReducer} from './AuthReducer';
import {combineReducers} from 'redux';

export const combinedReducer = combineReducers({
  auth: AuthReducer,
  alert: AlertReducer,
});

export type StoreState = ReturnType<typeof combinedReducer>;
