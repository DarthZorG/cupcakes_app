import {Action} from 'redux';

export const START_LOADING: string = 'START_LOADING';
export const STOP_LOADING: string = 'STOP_LOADING';
export const RESET_LOADING: string = 'RESET_LOADING';

export interface LoaderAction extends Action<string> {}

export const startLoading = (): LoaderAction => {
  return {type: START_LOADING};
};

export const stopLoading = (): LoaderAction => {
  return {type: STOP_LOADING};
};

export const resetLoading = (): LoaderAction => {
  return {type: RESET_LOADING};
};
