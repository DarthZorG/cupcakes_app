import {APIError} from '../Errors/APIError';
import {ErrorResponse} from '../models/GenericAPIResponse';
import {BaseService} from './BaseService';
import {API_URL} from '../config';
import {PaymentMethod} from '../models/PaymentMethod';

export default class PaymentMethodService extends BaseService {
  static async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await fetch(API_URL + 'PaymentMethods', {
      method: 'GET',
      headers: {
        ...this.getCommonHeaders(),
      },
    });
    let jsonResponse: PaymentMethod[] | ErrorResponse | null = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      //ignore this error now
    }
    if (response.ok) {
      return jsonResponse as PaymentMethod[];
    } else {
      throw new APIError(jsonResponse as ErrorResponse, response);
    }
  }
}
