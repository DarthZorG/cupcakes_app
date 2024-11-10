import {APIError} from '../Errors/APIError';
import {ErrorResponse} from '../models/GenericAPIResponse';
import {BaseService} from './BaseService';
import {API_URL} from '../config';
import {DeliveryMethod} from '../models/DeliveryMethod';

export default class DeliveryMethodService extends BaseService {
  static async getDeliveryMethods(): Promise<DeliveryMethod[]> {
    const response = await fetch(API_URL + 'DeliveryMethods', {
      method: 'GET',
      headers: {
        ...this.getCommonHeaders(),
      },
    });
    return await this.handleResponse<DeliveryMethod[]>(response);
  }
}
