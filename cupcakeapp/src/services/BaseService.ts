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
