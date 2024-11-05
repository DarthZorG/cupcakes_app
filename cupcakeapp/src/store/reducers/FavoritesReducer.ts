import {Product} from '../../models/Product';
import {
  ADD_FAVORITE,
  FavoriteAction,
  getFavoriteKey,
  REMOVE_FAVORITE,
  SET_FAVORITES,
} from '../actions/FavoriteActions';

export type FavoriteCollection = {[key: string]: Product};

export interface FavoriteStatus {
  items: FavoriteCollection;
}

const INITIAL_STATE: FavoriteStatus = {
  items: {},
};

export const FavoriteReducer = (
  previousState: FavoriteStatus = INITIAL_STATE,
  action: FavoriteAction,
): FavoriteStatus => {
  switch (action.type) {
    case ADD_FAVORITE:
      if (
        action.product != null &&
        previousState.items[getFavoriteKey(action.product)] == null
      ) {
        return {
          ...previousState,
          items: {
            ...previousState.items,
            [getFavoriteKey(action.product)]: action.product,
          },
        };
      }
      break;
    case REMOVE_FAVORITE:
      if (
        action.product != null &&
        previousState.items[getFavoriteKey(action.product)] != null
      ) {
        const newItems = {...previousState.items};
        delete newItems[getFavoriteKey(action.product)];

        return {
          ...previousState,
          items: newItems,
        };
      }
      break;
    case SET_FAVORITES:
      if (action.favorites != null) {
        const newItems: FavoriteCollection = {};
        action.favorites.forEach(element => {
          newItems[getFavoriteKey(element)] = element;
        });
        return {
          ...previousState,
          items: newItems,
        };
      }
      break;
    default:
      return previousState;
  }
  return previousState;
};
