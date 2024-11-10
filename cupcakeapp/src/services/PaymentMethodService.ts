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
    return await this.handleResponse<PaymentMethod[]>(response);
  }
}
