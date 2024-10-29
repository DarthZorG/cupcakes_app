import {BaseService} from '../../services/BaseService';
import {
  AuthAction,
  LOGIN,
  LOGOUT,
  REGISTER,
  RETRIEVE_TOKEN,
} from '../actions/AuthActions';

export interface AuthStatus {
  token?: string | null;
  tokenExpire?: string | null;
}

const INITIAL_STATE: AuthStatus = {
  token: null,
  tokenExpire: null,
};

export const AuthReducer = (
  previousState: AuthStatus = INITIAL_STATE,
  action: AuthAction,
): AuthStatus => {
  switch (action.type) {
    case RETRIEVE_TOKEN:
      BaseService.setToken(action.token!);
      return {
        ...previousState,
        token: action.token,
        tokenExpire: action.token_expiration,
      };
    case LOGIN:
      BaseService.setToken(action.token!);
      return {
        ...previousState,
        token: action.token,
        tokenExpire: action.token_expiration,
      };
    case LOGOUT:
      BaseService.setToken(null);
      return {
        ...previousState,
        token: null,
        tokenExpire: null,
      };
    case REGISTER:
      BaseService.setToken(action.token!);
      return {
        ...previousState,
        token: action.token,
        tokenExpire: action.token_expiration,
      };

    default:
      return previousState;
  }
};
