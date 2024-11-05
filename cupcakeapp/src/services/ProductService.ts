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
    let jsonResponse: ErrorResponse | null = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      //ignore this error now
    }
    console.log(jsonResponse);
    if (response.ok) {
      return;
    } else {
      throw new APIError(jsonResponse as ErrorResponse, response);
    }
  }

  static async addProduct(product: Product): Promise<Product> {
    const response = await fetch(API_URL + 'Products', {
      method: 'POST',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
      body: JSON.stringify(product),
    });
    let jsonResponse: Product | ErrorResponse | null = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      //ignore this error now
    }
    if (response.ok) {
      return jsonResponse as Product;
    } else {
      throw new APIError(jsonResponse as ErrorResponse, response);
    }
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
    let jsonResponse: ErrorResponse | null = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      //ignore this error now
    }
    if (response.ok) {
      return;
    } else {
      throw new APIError(jsonResponse as ErrorResponse, response);
    }
  }
}
