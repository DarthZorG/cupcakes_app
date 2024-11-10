import {APIError} from '../Errors/APIError';
import {ErrorResponse} from '../models/GenericAPIResponse';
import {AuthorizationHeader, BaseService} from './BaseService';
import {API_URL} from '../config';
import {ProductListResponse} from '../models/Product';

export default class FavoriteService extends BaseService {
  static async getFavorites(): Promise<ProductListResponse> {
    const response = await fetch(API_URL + 'Favorites', {
      method: 'GET',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
    });
    return await this.handleResponse<ProductListResponse>(response);
  }

  static async addFavorite(productId: number): Promise<void> {
    const response = await fetch(API_URL + 'Favorites', {
      method: 'POST',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
      body: JSON.stringify({productId}),
    });
    return await this.handleResponse<void>(response);
  }

  static async deleteFavorite(productId: number): Promise<void> {
    const response = await fetch(
      API_URL + 'Favorites/product/' + encodeURIComponent(productId),
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
