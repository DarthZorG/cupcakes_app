import {Address} from './Address';
import {DeliveryMethod} from './DeliveryMethod';
import {PaymentMethod} from './PaymentMethod';
import {Product} from './Product';
import {IUser} from './User';

export interface OrderItem {
  orderId?: number;
  productId: number;
  order?: Order;
  product?: Product;
  quantity: number;
}

export interface Order {
  id: number;
  userId?: string;
  User?: IUser;
  status?: string;
  totalPrice: number;
  paymentMethodId?: number;
  paymentMethod?: PaymentMethod;
  deliveryMethodId?: number;
  deliveryMethod?: DeliveryMethod;
  addressId?: number;
  address?: Address;
  cardHolderName?: string;
  cardNumber?: string;
  cardValidTill?: string;
  cardCVV?: string;
  items: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface NewOrder {
  paymentMethodId: number;
  deliveryMethodId: number;
  items: OrderItem[];
  addressId?: number;
  cardHolderName?: string;
  cardNumber?: string;
  cardValidTill?: string;
  cardCVV?: string;
}
