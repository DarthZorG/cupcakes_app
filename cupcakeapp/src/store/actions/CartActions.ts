import {Action} from 'redux';
import {Product} from '../../models/Product';

export const ADD_CART_ITEM: string = 'ADD_CART_ITEM';
export const UPDATE_CART_ITEM: string = 'UPDATE_CART_ITEM';

export interface CartAction extends Action<string> {
  product?: Product;
  quantity?: number;
}

export function getCartKey(product: Product): string {
  return '#' + product.id;
}

export const addItemToCart = (product: Product): CartAction => {
  return {type: ADD_CART_ITEM, product: product};
};

export const updateCartItem = (
  product: Product,
  quantity: number,
): CartAction => {
  return {type: UPDATE_CART_ITEM, product: product, quantity: quantity};
};

export const removeCartProduct = (product: Product): CartAction => {
  return updateCartItem(product, 0);
};
