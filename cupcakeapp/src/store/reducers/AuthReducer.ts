import {BaseService} from '../../services/BaseService';
import {
  AuthAction,
  LOGIN,
  LOGOUT,
  REGISTER,
  RETRIEVE_TOKEN,
  SET_ADMIN,
} from '../actions/AuthActions';

export interface AuthStatus {
  token?: string | null;
  tokenExpire?: string | null;
  isAdmin: boolean;
}

const INITIAL_STATE: AuthStatus = {
  token: null,
  tokenExpire: null,
  isAdmin: false,
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
        isAdmin: false,
      };
    case LOGIN:
      BaseService.setToken(action.token!);
      return {
        ...previousState,
        token: action.token,
        tokenExpire: action.token_expiration,
        isAdmin: false,
      };
    case LOGOUT:
      BaseService.setToken(null);
      return {
        ...previousState,
        token: null,
        tokenExpire: null,
        isAdmin: false,
      };
    case REGISTER:
      BaseService.setToken(action.token!);
      return {
        ...previousState,
        token: action.token,
        tokenExpire: action.token_expiration,
        isAdmin: false,
      };
    case SET_ADMIN:
      if (action.isAdmin !== undefined) {
        return {
          ...previousState,
          isAdmin: action.isAdmin,
        };
      }
      break;
    default:
      return previousState;
  }
  return previousState;
};
