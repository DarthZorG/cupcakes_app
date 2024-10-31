import {APIError} from '../Errors/APIError';
import {ErrorResponse} from '../models/GenericAPIResponse';
import {AuthorizationHeader, BaseService} from './BaseService';
import {API_URL} from '../config';
import {ProductListResponse} from '../models/ProductResponses';

export default class ProductService extends BaseService {
  static async getProducts(): Promise<ProductListResponse> {
    const response = await fetch(API_URL + 'Products', {
      method: 'GET',
      headers: {
        ...this.getCommonHeaders(),
      },
    });
    let jsonResponse: ProductListResponse | ErrorResponse | null = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      //ignore this error now
    }
    if (response.ok) {
      return jsonResponse as ProductListResponse;
    } else {
      throw new APIError(jsonResponse as ErrorResponse, response);
    }
  }
}
