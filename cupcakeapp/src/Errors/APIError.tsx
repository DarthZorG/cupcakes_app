import {Dispatch} from 'react';
import {ErrorResponse} from '../models/GenericAPIResponse';
import {showAlert} from '../store/actions/AlertActions';
import React from 'react';
import {DefaultText, BoldText} from '../components/StyledTexts';
import {StyleSheet, View} from 'react-native';
import {AlertPopupButton} from '../components/AlertPopup';
import {GRAY} from '../config/colors';

export class APIError extends Error {
  apiResponse: ErrorResponse | null = null;
  // eslint-disable-next-line no-undef
  requestResponse: Response;

  constructor(
    apiResponse: ErrorResponse | null,
    // eslint-disable-next-line no-undef
    requestResponse: Response,
  ) {
    super(apiResponse?.title ?? 'Erro do servidor');
    this.apiResponse = apiResponse;
    this.requestResponse = requestResponse;
  }

  hasErrorType(errorType: string): boolean {
    return (
      this.apiResponse != null &&
      this.apiResponse.errors != null &&
      (Array.isArray(this.apiResponse.errors[errorType]) ||
        typeof this.apiResponse.errors[errorType] === 'string')
    );
  }

  getErrorMessageCount(errorType: string): number {
    if (this.hasErrorType(errorType)) {
      if (Array.isArray(this.apiResponse!.errors![errorType])) {
        return this.apiResponse!.errors![errorType].length;
      } else {
        return 1;
      }
    }
    return 0;
  }

  //always returns a string, useful to avoid hard crashes on Alert.alert
  getErrorMessage(errorType: string, errorIndex?: number): string {
    errorIndex = errorIndex ?? 0;
    if (!this.hasErrorType(errorType)) {
      return '';
    }
    if (Array.isArray(this.apiResponse!.errors![errorType])) {
      if (
        this.getErrorMessageCount(errorType) > errorIndex &&
        errorIndex >= 0
      ) {
        return this.apiResponse!.errors![errorType][errorIndex];
      }
    } else {
      if (errorIndex === 0) {
        return this.apiResponse!.errors![errorType] as string;
      }
    }
    return '';
  }

  showAlert(dispatch: Dispatch<any>, buttons?: AlertPopupButton[]): void {
    console.log({...this});
    console.log('errors:', this.apiResponse?.errors);

    let errorMessage = 'Network error';
    let messageContent: JSX.Element[] = [];

    if (this.apiResponse != null) {
      if (this.apiResponse.title !== '' && this.apiResponse.title != null) {
        errorMessage = this.apiResponse.title;
      }
      if (this.apiResponse.errors != null) {
        const keys = Object.keys(this.apiResponse.errors);
        keys.forEach((k, kIndex) => {
          const errorInfo: JSX.Element[] = [];
          const errors: string[] | string = this.apiResponse!.errors![k];
          if (Array.isArray(errors)) {
            errors.forEach((e, eIndex) => {
              errorInfo.push(
                <DefaultText key={kIndex.toFixed(0) + '_' + eIndex.toFixed(0)}>
                  {e}
                </DefaultText>,
              );
            });
          } else {
            errorInfo.push(
              <DefaultText key={kIndex.toFixed(0) + '_0'}>
                {errors}
              </DefaultText>,
            );
          }
          if (errorInfo.length > 0) {
            messageContent.push(
              <View style={styles.errorContainer} key={kIndex.toFixed(0)}>
                <BoldText style={styles.errorHeading}>{k}</BoldText>
                <View style={styles.errorInfos}>{errorInfo}</View>
              </View>,
            );
          }
        });
      }
    }

    dispatch(
      showAlert(
        'Erro',
        errorMessage,
        buttons ?? [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ],
        messageContent.length > 0 ? (
          <View style={styles.messageDetails}>
            <BoldText style={styles.errorIntro}>{'Detalhes'}</BoldText>
            {messageContent}
          </View>
        ) : null,
      ),
    );
  }
}

const styles = StyleSheet.create({
  messageDetails: {
    marginTop: 10,
    paddingTop: 10,
    borderTopColor: GRAY,
    borderTopWidth: 1,
    width: '100%',
    alignSelf: 'center',
  },
  errorInfos: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
    width: '100%',
  },
  errorContainer: {
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  errorHeading: {
    fontSize: 12,
  },
  errorIntro: {
    alignSelf: 'center',
  },
});
