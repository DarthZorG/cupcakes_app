import {AuthReducer} from './AuthReducer';
import {combineReducers} from 'redux';

export const combinedReducer = combineReducers({
  auth: AuthReducer,
});

export type StoreState = ReturnType<typeof combinedReducer>;
