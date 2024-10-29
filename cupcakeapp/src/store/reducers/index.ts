import {AlertReducer} from './AlertReducer';
import {AuthReducer} from './AuthReducer';
import {combineReducers} from 'redux';
import {LoaderReducer} from './LoaderReducter';

export const combinedReducer = combineReducers({
  auth: AuthReducer,
  alert: AlertReducer,
  loader: LoaderReducer,
});

export type StoreState = ReturnType<typeof combinedReducer>;
