import {AlertReducer} from './AlertReducer';
import {AuthReducer} from './AuthReducer';
import {combineReducers} from 'redux';
import {LoaderReducer} from './LoaderReducter';
import {FavoriteReducer} from './FavoritesReducer';
import {CartReducer} from './CartReducer';

export const combinedReducer = combineReducers({
  auth: AuthReducer,
  alert: AlertReducer,
  loader: LoaderReducer,
  favorites: FavoriteReducer,
  cart: CartReducer,
});

export type StoreState = ReturnType<typeof combinedReducer>;
