import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';

export const SET_USER_ID: string = 'SET_USER_ID';
export const RETRIEVE_TOKEN: string = 'RETRIEVE_TOKEN';
export const LOGIN: string = 'LOGIN';
export const LOGOUT: string = 'LOGOUT';
export const REGISTER: string = 'REGISTER';
export const STOP_LOADING_AUTH: string = 'STOP_LOADING_AUTH';
export const SET_BIOMETRIC_STATUS: string = 'SET_BIOMETRIC_STATUS';

export interface AuthAction extends Action<string> {
  userId?: string;
  token?: string | null;
  token_expiration?: string;
  biometryAvailable?: boolean;
  biometryEnabled?: boolean;
}
