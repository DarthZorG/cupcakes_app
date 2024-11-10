import {APIError} from '../Errors/APIError';
import {ErrorResponse} from '../models/GenericAPIResponse';
import {AuthorizationHeader, BaseService} from './BaseService';
import {API_URL} from '../config';
import {IUser} from '../models/User';
import {CreateUserRequest} from '../models/CreateUserRequest';

export default class UserService extends BaseService {
  static async getCurrentUser(): Promise<IUser> {
    const response = await fetch(API_URL + 'Users/me', {
      method: 'GET',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
    });
    return await this.handleResponse<IUser>(response);
  }

  static async updateUser(userId: string, data: IUser): Promise<void> {
    const response = await fetch(
      API_URL + 'Users/' + encodeURIComponent(userId),
      {
        method: 'PUT',
        headers: {
          ...this.getCommonHeaders(AuthorizationHeader.Required),
        },
        body: JSON.stringify(data),
      },
    );
    return await this.handleResponse<void>(response);
  }

  static async isAdmin(): Promise<boolean> {
    const response = await fetch(API_URL + 'Users/isAdmin', {
      method: 'GET',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
    });
    try {
      await this.handleResponse<void>(response);
      return true;
    } catch (e: any) {
      if (e instanceof APIError) {
        if (e.requestResponse.status === 403) {
          return false;
        }
      }
      throw e;
    }
  }

  static async addUser(data: CreateUserRequest): Promise<IUser> {
    const response = await fetch(API_URL + 'Users', {
      method: 'POST',
      headers: {
        ...this.getCommonHeaders(AuthorizationHeader.Required),
      },
      body: JSON.stringify(data),
    });
    return await this.handleResponse<IUser>(response);
  }
  /*
  static async deleteAddress(addressId: number): Promise<void> {
    const response = await fetch(
      API_URL + 'Addresses/' + encodeURIComponent(addressId),
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
  } */
}
