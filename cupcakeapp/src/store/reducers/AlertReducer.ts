import React from 'react';
import {
  AlertContentCallback,
  AlertPopupProps,
} from '../../components/AlertPopup';
import {AlertAction, HIDE_ALERT, SHOW_ALERT} from '../actions/AlertActions';

export interface AlertInfo {
  props: AlertPopupProps<any>;
  content?: React.ReactNode | null | AlertContentCallback<any>;
  autoClose: boolean;
}

export interface AlertStatus {
  activeAlert: AlertInfo | null;
}

const INITIAL_STATE: AlertStatus = {
  activeAlert: null,
};

export const AlertReducer = (
  previousState: AlertStatus = INITIAL_STATE,
  action: AlertAction,
): AlertStatus => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...previousState,
        activeAlert: {
          props: action.alertProps!,
          content: action.content,
          autoClose: action.autoClose ?? true,
        },
      };
    case HIDE_ALERT:
      return {
        ...previousState,
        activeAlert: null,
      };
    default:
      return previousState;
  }
};
