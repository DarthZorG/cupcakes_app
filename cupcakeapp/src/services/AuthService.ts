import {
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
} from '../models/AuthResponses';
import {APIError} from '../Errors/APIError';
import {ErrorResponse, GenericAPIResponse} from '../models/GenericAPIResponse';
import {BaseService} from './BaseService';
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
    let jsonResponse: LoginResponse | ErrorResponse | null = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      //ignore this error now
    }
    if (response.ok) {
      return jsonResponse as LoginResponse;
    } else {
      throw new APIError(jsonResponse as ErrorResponse, response);
    }
  }

  static async refreshToken(
    oldToken: string,
  ): Promise<RefreshTokenResponse | null> {
    const response = await fetch(`${API_URL}/token/refresh`, {
      method: 'GET',
      headers: {
        ...this.getCommonHeaders(),
        Authorization: 'Bearer ' + oldToken,
      },
    });

    let jsonResponse: RefreshTokenResponse | ErrorResponse | null = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {}
    if (response.ok) {
      return jsonResponse as RefreshTokenResponse;
    }
    throw new APIError(jsonResponse as ErrorResponse, response);
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