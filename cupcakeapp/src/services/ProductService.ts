import {APIError} from '../Errors/APIError';
import {ErrorResponse, WithRequired} from '../models/GenericAPIResponse';
import {AuthorizationHeader, BaseService} from './BaseService';
import {API_URL} from '../config';
import {Product, ProductListResponse} from '../models/Product';

export default class ProductService extends BaseService {
  static async getProducts(): Promise<ProductListResponse> {
    const response = await fetch(API_URL + 'Products', {
      method: 'GET',
      headers: {
        ...this.getCommonHeaders(),
      },
    });
    return await this.handleResponse<ProductListResponse>(response);
  }

  static async updateProduct(
    productId: number,
    product: Product,
  ): Promise<void> {
    const response = await fetch(
      API_URL + 'Products/' + encodeURIComponent(productId),
      {
        method: 'PUT',
        headers: {
          ...this.getCommonHeaders(AuthorizationHeader.Required),
        },
        body: JSON.stringify(product),
      },
    );
    return await this.handleResponse<void>(response);
  }

  static async addProduct(product: Product): Promise<Product> {
    const response = await fetch(API_URL + 'Products', {
      method: 'POST',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
      body: JSON.stringify(product),
    });
    return await this.handleResponse<Product>(response);
  }

  static async deleteProduct(productId: number): Promise<void> {
    const response = await fetch(
      API_URL + 'Products/' + encodeURIComponent(productId),
      {
        method: 'DELETE',
        headers: {
          ...this.getCommonHeaders(AuthorizationHeader.Required),
        },
      },
    );
    return await this.handleResponse<void>(response);
  }
}
