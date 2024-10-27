import {createStore, applyMiddleware, compose, Store} from 'redux';
import thunk from 'redux-thunk';
import {combinedReducer, StoreState} from './reducers';

export function reduxStore(initialState = {}) {
  const middleware = compose(applyMiddleware(thunk));
  return createStore(combinedReducer, initialState, middleware);
}

const store = reduxStore();

export function getStore(): Store<StoreState> {
  return store;
}

export default store;
