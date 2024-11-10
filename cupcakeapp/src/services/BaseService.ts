import { APIError } from '../Errors/APIError';
import {ErrorResponse} from '../models/GenericAPIResponse';

export enum AuthorizationHeader {
  None,
  Optional,
  Required,
}

let authToken: string | null = null;

export class BaseService {
  static getToken(required: boolean): string | null {
    if (authToken == null) {
      if (required) {
        throw new Error('The user is not authenticated');
      } else {
        return null;
      }
    }
    return 'Bearer ' + authToken;
  }

  static setToken(token: string | null) {
    authToken = token;
  }

  static async handleResponse<T>(response: Response): Promise<T> {
    let jsonResponse: T | ErrorResponse | null = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      //ignore this error now
    }
    if (response.ok) {
      return jsonResponse as T;
    } else {
      throw new APIError(jsonResponse as ErrorResponse, response);
    }
  }

  static getCommonHeaders(
    withAuthentication: AuthorizationHeader = AuthorizationHeader.None,
  ): HeadersInit_ {
    const baseHeaders: HeadersInit_ = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let authHeader: string | null = null;

    switch (withAuthentication) {
      case AuthorizationHeader.Optional:
        authHeader = this.getToken(false);
        break;
      case AuthorizationHeader.Required:
        authHeader = this.getToken(true);
        break;
    }
    if (authHeader != null) {
      baseHeaders.Authorization = authHeader;
    }

    return baseHeaders;
  }
}
