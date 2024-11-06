import {Dispatch} from 'react';
import {stopLoading} from '../store/actions/LoaderActions';
import {APIError} from './APIError';
import {showAlert} from '../store/actions/AlertActions';

export default class ErrorHelper {
  static handleError(
    e: any,
    dispatch: Dispatch<any>,
    shoudlStopLoading: boolean = true,
  ): void {
    if (shoudlStopLoading) {
      dispatch(stopLoading());
    }
    console.log(e);
    if (e instanceof APIError) {
      e.showAlert(dispatch);
    } else {
      dispatch(showAlert('Erro', e.message));
    }
  }
}
