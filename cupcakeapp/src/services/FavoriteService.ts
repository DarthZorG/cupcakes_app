import {APIError} from '../Errors/APIError';
import {ErrorResponse} from '../models/GenericAPIResponse';
import {AuthorizationHeader, BaseService} from './BaseService';
import {API_URL} from '../config';
import {ProductListResponse} from '../models/ProductResponses';

export default class FavoriteService extends BaseService {
  static async getFavorites(): Promise<ProductListResponse> {
    const response = await fetch(API_URL + 'Favorites', {
      method: 'GET',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
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

  static async addFavorite(productId: number): Promise<void> {
    const response = await fetch(API_URL + 'Favorites', {
      method: 'POST',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
      body: JSON.stringify({productId}),
    });
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