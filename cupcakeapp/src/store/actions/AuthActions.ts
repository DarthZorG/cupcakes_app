import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {
  BaseAuthTokenResponse,
  LoginResponse,
  RegisterResponse,
} from '../../models/AuthResponses';
import {StoreState} from '../reducers';
import EncryptedStorage from 'react-native-encrypted-storage';

export const RETRIEVE_TOKEN: string = 'RETRIEVE_TOKEN';
export const LOGIN: string = 'LOGIN';
export const LOGOUT: string = 'LOGOUT';
export const REGISTER: string = 'REGISTER';

export interface AuthAction extends Action<string> {
  userId?: string;
  token?: string | null;
  token_expiration?: string;
  biometryAvailable?: boolean;
  biometryEnabled?: boolean;
}

function getExpiration(expiresIn: number): Date {
  return new Date(Date.now() + Math.max(0, expiresIn - 300) * 1000);
}

export const login = (
  data: LoginResponse,
): ThunkAction<Promise<void>, StoreState, {}, AuthAction> => {
  return async function (
    dispatch: ThunkDispatch<StoreState, {}, AuthAction>,
    getState: () => StoreState,
  ): Promise<void> {
    const expiration = getExpiration(data.expires_in);

    try {
      await EncryptedStorage.setItem('token', data.access_token);
      await EncryptedStorage.setItem(
        'token_expiration',
        expiration.toISOString(),
      );
    } catch (e) {
      console.log(e);
    }
    dispatch({
      type: 'LOGIN',
      token: data.access_token,
      token_expiration: expiration.toISOString(),
    });
    /*   try {
      const profileData = await ProfileService.getProfile();
      dispatch(setUserId(profileData.data.customer.id));
    } catch (e: any) {
      console.log(e);
    } */
  };
};

export const logout = (): ThunkAction<
  Promise<void>,
  StoreState,
  {},
  AuthAction
> => {
  return async function (
    dispatch: ThunkDispatch<StoreState, {}, AuthAction>,
    getState: () => StoreState,
  ): Promise<void> {
    try {
      await EncryptedStorage.removeItem('token');
      await EncryptedStorage.removeItem('token_expiration');
      dispatch({type: LOGOUT});
    } catch (e) {
      console.log(e);
    }
  };
};

export const register = (
  data: RegisterResponse,
): ThunkAction<Promise<void>, StoreState, {}, AuthAction> => {
  return async function (
    dispatch: ThunkDispatch<StoreState, {}, AuthAction>,
    getState: () => StoreState,
  ): Promise<void> {
    const expiration = getExpiration(data.expires_in);
    try {
      await EncryptedStorage.setItem('token', data.access_token);
      await EncryptedStorage.setItem(
        'token_expiration',
        expiration.toISOString(),
      );
    } catch (e) {
      console.log(e);
    }
    dispatch({
      type: REGISTER,
      token: data.access_token,
      token_expiration: expiration.toISOString(),
    });
  };
};

export const updateAuthToken = (
  data: BaseAuthTokenResponse,
): ThunkAction<Promise<void>, StoreState, {}, AuthAction> => {
  return async function (
    dispatch: ThunkDispatch<StoreState, {}, AuthAction>,
    getState: () => StoreState,
  ): Promise<void> {
    const expiration = getExpiration(data.expires_in);
    try {
      await EncryptedStorage.setItem('token', data.access_token);
      await EncryptedStorage.setItem(
        'token_expiration',
        expiration.toISOString(),
      );
    } catch (e) {
      console.log(e);
    }
    dispatch({
      type: RETRIEVE_TOKEN,
      token: data.access_token,
      token_expiration: expiration.toISOString(),
    });
  };
};
