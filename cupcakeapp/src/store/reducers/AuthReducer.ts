import {BaseService} from '../../services/BaseService';
import {
  AuthAction,
  LOGIN,
  LOGOUT,
  REGISTER,
  RETRIEVE_TOKEN,
  SET_BIOMETRIC_STATUS,
  SET_USER_ID,
  STOP_LOADING_AUTH,
} from '../actions/AuthActions';

export interface AuthStatus {
  userId: string | null;
  token: string | null;
  tokenExpire: string | null;
  isLoading: boolean;
}

const INITIAL_STATE: AuthStatus = {
  userId: null,
  token: null,
  tokenExpire: null,
  isLoading: true,
};

export const AuthReducer = (
  previousState: AuthStatus = INITIAL_STATE,
  action: AuthAction,
): AuthStatus => {
  switch (action.type) {
    default:
      return previousState;
  }
};
