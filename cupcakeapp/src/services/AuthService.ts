import {
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
} from '../models/AuthResponses';
import {APIError} from '../Errors/APIError';
import {ErrorResponse, GenericAPIResponse} from '../models/GenericAPIResponse';
import {AuthorizationHeader, BaseService} from './BaseService';
import {API_URL, BASE_URL} from '../config';

export default class AuthService extends BaseService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    const bodyFormData = new FormData();
    bodyFormData.append('grant_type', 'password');
    bodyFormData.append('userName', email);
    bodyFormData.append('password', password);

    const response = await fetch(BASE_URL + 'identity/authorize', {
      method: 'POST',
      headers: {
        ...this.getCommonHeaders(),
        'Content-Type': 'multipart/form-data',
      },
      body: bodyFormData,
    });
    return await this.handleResponse<LoginResponse>(response);
  }

  static async refreshToken(
    authToken: string,
    refreshToken: string,
  ): Promise<RefreshTokenResponse | null> {
    const url = `${BASE_URL}identity/authorize/refresh`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.getCommonHeaders(),
        Authorization: 'Bearer ' + authToken,
      },
      body: JSON.stringify({refresh_token: refreshToken}),
    });

    return await this.handleResponse<RefreshTokenResponse>(response);
  }

  static async register(
    firstName: string,
    lastName: string,
    email: string,
    state: string,
    country: string,
    phone: string,
    password: string,
    deviceId: string,
  ): Promise<RegisterResponse> {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: this.getCommonHeaders(),
      body: JSON.stringify({
        accepts_marketing: true,
        first_name: firstName,
        last_name: lastName,
        email: email,
        state: state,
        country: country,
        phone: phone,
        password: password,
        device_id: deviceId,
      }),
    });
    let jsonResponse: RegisterResponse | ErrorResponse | null = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      //ignore this error now
    }

    if (response.ok) {
      return jsonResponse as RegisterResponse;
    } else {
      throw new APIError(jsonResponse as ErrorResponse, response);
    }
  }

  static async forgotPassword(email: string): Promise<void> {
    const response = await fetch(API_URL + '/password/forgot', {
      method: 'POST',
      headers: this.getCommonHeaders(),
      body: JSON.stringify({
        email: email,
      }),
    });
    let jsonResponse: GenericAPIResponse<any> | null = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      //ignore this error now
    }
    if (response.ok && response.status === 204) {
      return;
    } else {
      throw new APIError(jsonResponse, response);
    }
  }
}
