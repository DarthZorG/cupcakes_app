import {APIError} from '../Errors/APIError';
import {ErrorResponse} from '../models/GenericAPIResponse';
import {AuthorizationHeader, BaseService} from './BaseService';
import {API_URL} from '../config';
import {CardDetails} from '../models/CardDetails';
import {Order} from '../models/Order';

export default class OrderService extends BaseService {
  static async addOrder(data: Order): Promise<Order> {
    const response = await fetch(API_URL + 'Orders', {
      method: 'POST',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
      body: JSON.stringify(data),
    });
    let jsonResponse: Order | ErrorResponse | null = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      //ignore this error now
    }
    if (response.ok) {
      return jsonResponse as Order;
    } else {
      throw new APIError(jsonResponse as ErrorResponse, response);
    }
  }

  static getEmptyCardDetails(): CardDetails {
    return {
      holderName: '',
      number: '',
      cvv: '',
      validTill: '',
    } as CardDetails;
  }
}
