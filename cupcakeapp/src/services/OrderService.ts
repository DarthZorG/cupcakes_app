import {APIError} from '../Errors/APIError';
import {ErrorResponse} from '../models/GenericAPIResponse';
import {AuthorizationHeader, BaseService} from './BaseService';
import {API_URL} from '../config';
import {CardDetails} from '../models/CardDetails';
import {NewOrder, Order} from '../models/Order';
import qs from 'qs';

export default class OrderService extends BaseService {
  static async getOrders(
    search?: string,
    count?: number,
    offset?: number,
    adminMode?: boolean,
  ): Promise<Order[]> {
    const query = qs.stringify({
      search,
      count,
      offset,
      adminMode,
    });
    console.log(query);
    const response = await fetch(API_URL + 'Orders?' + query, {
      method: 'GET',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
    });

    return await this.handleResponse<Order[]>(response);
  }

  static async addOrder(data: NewOrder): Promise<Order> {
    const response = await fetch(API_URL + 'Orders', {
      method: 'POST',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
      body: JSON.stringify(data),
    });
    return await this.handleResponse<Order>(response);
  }

  static async updateOrder(data: Order): Promise<void> {
    const response = await fetch(API_URL + 'Orders/' + String(data.id), {
      method: 'PUT',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
      body: JSON.stringify(data),
    });
    return await this.handleResponse<void>(response);
  }

  static getEmptyCardDetails(): CardDetails {
    return {
      holderName: '',
      number: '',
      cvv: '',
      validTill: '',
    } as CardDetails;
  }

  static getStatusString(status?: string): string {
    switch (status) {
      case 'CREATED':
        return 'criado';
      case 'CANCELLED':
        return 'cancelado';
      case 'PAID':
        return 'pago';
      case 'SENT':
        return 'enviado';
      case 'DELIVERED':
        return 'entregue';
    }
    return '- desconhecido -';
  }
}
