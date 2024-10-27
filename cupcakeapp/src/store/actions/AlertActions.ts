import React from 'react';
import {Action} from 'redux';
import {
  AlertButtonOrientation,
  AlertContentCallback,
  AlertPopupButton,
  AlertPopupProps,
} from '../../components/AlertPopup';

export const SHOW_ALERT: string = 'SHOW_ALERT';
export const HIDE_ALERT: string = 'HIDE_ALERT';

export interface AlertAction extends Action<string> {
  alertProps?: AlertPopupProps<any>;
  autoClose?: boolean;
}

export const showAlert = <T>(
  title: string,
  message?: React.ReactNode,
  buttons?: AlertPopupButton[],
  content?: React.ReactNode | AlertContentCallback,
  autoClose?: boolean,
  onRequestClose?: () => void,
  buttonOrientation?: AlertButtonOrientation,
): AlertAction => {
  const alertProps: AlertPopupProps<T> = {
    title,
    message,
    buttons,
    content,
    onRequestClose,
    buttonOrientation,
  };
  return {
    type: SHOW_ALERT,
    alertProps: alertProps,
    autoClose: autoClose ?? true,
  };
};

export const hideAlert = (): AlertAction => {
  return {
    type: HIDE_ALERT,
  };
};
