import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {combinedReducer} from './reducers';

export function reduxStore(initialState = {}) {
  const middleware = compose(applyMiddleware(thunk));
  return createStore(combinedReducer, initialState, middleware);
}

const store = reduxStore();
export default store;
