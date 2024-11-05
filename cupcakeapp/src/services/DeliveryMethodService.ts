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
    let jsonResponse: DeliveryMethod[] | ErrorResponse | null = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      //ignore this error now
    }
    if (response.ok) {
      return jsonResponse as DeliveryMethod[];
    } else {
      throw new APIError(jsonResponse as ErrorResponse, response);
    }
  }
}
