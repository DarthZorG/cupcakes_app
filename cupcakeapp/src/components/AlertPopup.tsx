import React, {Fragment, useEffect} from 'react';
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {DefaultText, BoldText} from './StyledTexts';
import {BLACK, BLUE, WHITE} from '../config/colors';
import {getStore} from '../store';
import {Dispatch, AnyAction} from 'redux';
import {showAlert} from '../store/actions/AlertActions';
import CustomButton from './CustomButton';
import KeyboardAwareScrollView from './KeyboardAwareScrollView';

export type AlertContentCallback = () => React.ReactNode;

export type AlertButtonOrientation = 'row' | 'column';

export interface AlertPopupButton {
  text: string;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
  testID?: string;
  isCancelButton?: boolean;
  buttonOrientation?: AlertButtonOrientation;
  isCustomButton?: boolean;
}

export interface AsyncAlertPopupResponse {
  buttonIndex: number;
}

export interface AsyncAlertPopupButton {
  text: string;
  style?: StyleProp<TextStyle>;
  testID?: string;
  isCancelButton?: boolean;
}

export interface GenericPopupProps<T> {
  title: string;
  scrollable?: boolean;
  message?: React.ReactNode;
  visible?: boolean;
  onRequestClose?: () => void;
  content?: React.ReactNode | AlertContentCallback;
  style?: StyleProp<TextStyle>;
}

export interface AlertPopupProps<T> extends GenericPopupProps<T> {
  buttons?: AlertPopupButton[];
  buttonOrientation?: 'row' | 'column';
}

export interface AsyncAlertPopupProps<T> extends GenericPopupProps<T> {
  buttons?: AsyncAlertPopupButton[];
}

const AlertPopup = <T,>(
  props: React.PropsWithChildren<AlertPopupProps<T>>,
): JSX.Element => {
  const buttons = props.buttons ?? [];
  const buttonOrientation = props.buttonOrientation ?? 'row';

  const getContent = (): React.ReactNode => {
    if (typeof props.content === 'function') {
      return props.content();
    }
    return props.content;
  };

  const uiButtons = buttons.map(
    (item: AlertPopupButton, itemIndex: number): JSX.Element => {
      if (item.isCustomButton) {
        return (
          <CustomButton
            key={'alert_button_' + itemIndex}
            title={item.text}
            style={[styles.button, item.style]}
            onPress={() => {
              item.onPress();
            }}
            testID={item.testID}
          />
        );
      } else {
        return (
          <TouchableOpacity
            key={'alert_button_' + itemIndex}
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              item.onPress();
            }}
            testID={item.testID}>
            <BoldText style={[styles.buttonText, item.style]}>
              {item.text}
            </BoldText>
          </TouchableOpacity>
        );
      }
    },
  );

  return (
    <Fragment>
      {props.visible && <View style={styles.modalCover} />}
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.onRequestClose}>
        <View style={styles.centeredView}>
          {/*  <KeyboardAwareScrollView contentContainerStyle={styles.centeredView}> */}
          <View style={styles.modalView}>
            <View style={styles.bottomBorder}>
              <BoldText style={styles.modalTitle}>{props.title}</BoldText>
            </View>
            <View style={styles.container}>
              {props.message != null && (
                <DefaultText style={styles.modalText}>
                  {props.message}
                </DefaultText>
              )}
              {getContent()}
              <View
                style={[
                  styles.modalButtonContainer,
                  {flexDirection: buttonOrientation},
                ]}>
                {uiButtons}
              </View>
            </View>
          </View>
          {/*}    </KeyboardAwareScrollView> */}
        </View>
      </Modal>
    </Fragment>
  );
};

export async function showAlertAsync(
  title: string,
  message?: React.ReactNode,
  buttons?: AsyncAlertPopupButton[],
  content?: React.ReactNode | AlertContentCallback,

  autoClose?: boolean,
  dispatch?: Dispatch<AnyAction>,
): Promise<AsyncAlertPopupResponse> {
  if (dispatch == null) {
    dispatch = getStore().dispatch;
  }

  const p = new Promise<AsyncAlertPopupResponse>((resolve, reject) => {
    const newButtons = (buttons ?? []).map(
      (e, index): AlertPopupButton => ({
        ...e,
        onPress: () => {
          const r: AsyncAlertPopupResponse = {
            buttonIndex: index,
          };
          resolve(r);
        },
      }),
    );
    const onClose = () => {
      reject(new Error('The dialog has been closed'));
    };

    dispatch!(
      showAlert(title, message, newButtons, content, autoClose, onClose),
    );
  });

  return await p;
}

export default AlertPopup;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    padding: 30,
  },
  modalButtonContainer: {
    paddingTop: '10%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: -1,
  },
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  modalView: {
    width: '100%',
    backgroundColor: WHITE,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
    fontSize: 16,
  },
  buttonOpen: {
    color: BLUE,
  },
  buttonClose: {},
  textStyle: {
    color: BLACK,
    textAlign: 'center',
  },
  modalText: {
    width: '100%',
    textAlign: 'center',
    paddingBottom: 5,
    // lineHeight: 20,
    fontSize: 20,
  },
  modalTitle: {
    // marginBottom: 15,
    color: BLACK,
    fontSize: 24,
    textAlign: 'center',
    width: '100%',
    // paddingBottom: 10,
  },
  bottomBorder: {
    width: '100%',
    paddingBottom: 10,
    marginBottom: 15,
    borderColor: 'black',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    // backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  modalCover: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#00000030',
  },
});
