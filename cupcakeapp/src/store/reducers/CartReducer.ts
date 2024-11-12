import {Product} from '../../models/Product';
import {
  ADD_CART_ITEM,
  CartAction,
  EMPTY_CART,
  getCartKey,
  UPDATE_CART_ITEM,
} from '../actions/CartActions';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CartCollection = {[key: string]: CartItem};

export interface CartStatus {
  items: CartCollection;
}

const INITIAL_STATE: CartStatus = {
  items: {},
};

function addCartItem(
  oldItems: CartCollection,
  product: Product,
): CartCollection {
  const items = {...oldItems};
  if (items[getCartKey(product)] != null) {
    items[getCartKey(product)].quantity += 1;
  } else {
    items[getCartKey(product)] = {
      product: product,
      quantity: 1,
    };
  }
  return items;
}

function updateCartItem(
  oldItems: CartCollection,
  product: Product,
  quantity: number,
): CartCollection {
  const items = {...oldItems};

  if (items[getCartKey(product)] == null) {
    if (quantity > 0) {
      items[getCartKey(product)] = {
        product: product,
        quantity: quantity,
      };
    }
    return items;
  }
  if (quantity <= 0) {
    delete items[getCartKey(product)];
  } else {
    items[getCartKey(product)].quantity = quantity;
  }
  return items;
}

export const CartReducer = (
  previousState: CartStatus = INITIAL_STATE,
  action: CartAction,
): CartStatus => {
  switch (action.type) {
    case ADD_CART_ITEM:
      if (action.product != null) {
        return {
          ...previousState,
          items: addCartItem(previousState.items, action.product),
        };
      }
      break;
    case EMPTY_CART:
      return {
        ...previousState,
        items: {},
      };
    case UPDATE_CART_ITEM:
      if (action.product != null && action.quantity != null) {
        return {
          ...previousState,
          items: updateCartItem(
            previousState.items,
            action.product,
            action.quantity,
          ),
        };
      }
      break;
    default:
      return previousState;
  }
  return previousState;
};
