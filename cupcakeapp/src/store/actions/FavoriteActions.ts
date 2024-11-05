import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {StoreState} from '../reducers';
import {Product} from '../../models/Product';
import FavoriteService from '../../services/FavoriteService';

export const ADD_FAVORITE: string = 'ADD_FAVORITE';
export const REMOVE_FAVORITE: string = 'REMOVE_FAVORITE';
export const SET_FAVORITES: string = 'SET_FAVORITES';

export interface FavoriteAction extends Action<string> {
  product?: Product;
  favorites?: Product[];
}

export function getFavoriteKey(product: Product): string {
  return '#' + product.id;
}

export const addFavorite = (
  product: Product,
): ThunkAction<Promise<void>, StoreState, {}, FavoriteAction> => {
  return async function (
    dispatch: ThunkDispatch<StoreState, {}, FavoriteAction>,
    getState: () => StoreState,
  ): Promise<void> {
    try {
      await FavoriteService.addFavorite(product.id);
    } catch (e) {
      console.log(e);
    }
    dispatch({
      type: 'ADD_FAVORITE',
      product: product,
    });
  };
};

export const removeFavorite = (
  product: Product,
): ThunkAction<Promise<void>, StoreState, {}, FavoriteAction> => {
  return async function (
    dispatch: ThunkDispatch<StoreState, {}, FavoriteAction>,
    getState: () => StoreState,
  ): Promise<void> {
    try {
      await FavoriteService.deleteFavorite(product.id);
    } catch (e) {
      console.log(e);
    }
    dispatch({
      type: 'REMOVE_FAVORITE',
      product: product,
    });
  };
};

export const loadFavorites = (): ThunkAction<
  Promise<void>,
  StoreState,
  {},
  FavoriteAction
> => {
  return async function (
    dispatch: ThunkDispatch<StoreState, {}, FavoriteAction>,
    getState: () => StoreState,
  ): Promise<void> {
    try {
      const favorites = await FavoriteService.getFavorites();
      dispatch({
        type: 'SET_FAVORITES',
        favorites,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
