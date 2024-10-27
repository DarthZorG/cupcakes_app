export interface BaseAuthTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface RefreshTokenResponse extends BaseAuthTokenResponse {}

export interface RegisterResponse extends BaseAuthTokenResponse {
  customer_id: string;
}

export interface LoginResponse extends BaseAuthTokenResponse {}
