/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useMemo} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import store from './src/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import {hideAlert} from './src/store/actions/AlertActions';
import AlertPopup from './src/components/AlertPopup';
import {StoreState} from './src/store/reducers';
import {AlertInfo} from './src/store/reducers/AlertReducer';
import {LoadingOverlay} from './src/components/LoadingOverlay';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  LOGOUT,
  setAdmin,
  updateAuthToken,
} from './src/store/actions/AuthActions';
import AuthService from './src/services/AuthService';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  loadFavorites,
  resetFavorites,
} from './src/store/actions/FavoriteActions';
import UserService from './src/services/UsersService';
import {BoldText, DefaultText} from './src/components/StyledTexts';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {BLACK, LIGHT_BLUE, WHITE} from './src/config/colors';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

function MainApp(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const activeAlert = useSelector(
    (state: StoreState): AlertInfo | null => state.alert.activeAlert,
  );
  const loadingCount = useSelector(
    (state: StoreState): number => state.loader.loadingCount,
  );
  const isAuthenticated = useSelector((state: StoreState): boolean => {
    return state.auth.token != null;
  });
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /**
   * Verify auth status of user.
   * @returns {Promise<void>}
   */
  const verifyAuthStatus = async (): Promise<void> => {
    try {
      const userToken: string | null = await EncryptedStorage.getItem('token');
      const tokenExpire: string | null = await EncryptedStorage.getItem(
        'token_expiration',
      );
      const refreshToken: string | null = await EncryptedStorage.getItem(
        'refresh_token',
      );

      if (userToken == null || refreshToken == null) {
        dispatch({type: LOGOUT});
      } else if (tokenExpire != null && new Date(tokenExpire) < new Date()) {
        dispatch({type: LOGOUT});
      } else {
        try {
          const response = await AuthService.refreshToken(
            userToken,
            refreshToken,
          );
          if (response != null) {
            dispatch(updateAuthToken(response));
          } else {
            dispatch({type: LOGOUT});
          }
        } catch (e: any) {
          // we should verify if we really need to log out
          console.log(e, e.message);
          dispatch({type: LOGOUT});
        }
      }
    } catch (error) {}
  };

  const popupAlert = useMemo(() => {
    const alertButtons = [...(activeAlert?.props?.buttons ?? [])];
    if (activeAlert?.autoClose) {
      // @ts-ignore
      alertButtons.forEach((item: AlertPopupButton) => {
        const oldOnPress = item.onPress;
        item.onPress = (data: any) => {
          dispatch(hideAlert());
          if (oldOnPress != null) {
            oldOnPress(data);
          }
        };
      });
      if (alertButtons.length === 0) {
        alertButtons.push({
          text: 'Ok',
          onPress: () => {
            dispatch(hideAlert());
          },
        });
      }
    }

    return (
      <AlertPopup
        onRequestClose={() => {
          dispatch(hideAlert());
        }}
        title=""
        {...activeAlert?.props}
        buttons={alertButtons}
        visible={activeAlert != null}
      />
    );
  }, [activeAlert]);

  useEffect(() => {
    verifyAuthStatus().catch(e => {
      console.log(e);
    });
  }, []);

  const checkAdminLevel = async () => {
    let isAdmin = false;
    try {
      isAdmin = await UserService.isAdmin();
    } catch {}
    dispatch(setAdmin(isAdmin));
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkAdminLevel();
      dispatch(loadFavorites());
    } else {
      dispatch(setAdmin(false));
      dispatch(resetFavorites());
    }
  }, [isAuthenticated]);

  return (
    <>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
      <LoadingOverlay loading={loadingCount > 0} />
      {popupAlert}
    </>
  );
}

const toastConfig = {
  cartToast: (props: any) => (
    <View style={styles.toastMainContainer}>
      <View style={styles.toastContainer}>
        <View style={[styles.toastBar, props.toastBarStyle]} />
        <View style={styles.toastInnerContainer}>
          <Material style={styles.toastIcon} name={'cart-outline'} />
          <View style={styles.toastMessageContainer}>
            <BoldText style={styles.toastHeader}>{props.text1}</BoldText>
            <DefaultText style={styles.toastMessage}>{props.text2}</DefaultText>
          </View>
        </View>
      </View>
    </View>
  ),
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MainApp />
        <Toast config={toastConfig} />
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  toastMainContainer: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'column',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 2,
    borderRadius: 15,
    shadowOpacity: 0.1,
  },
  toastBar: {height: '100%', width: 5, backgroundColor: LIGHT_BLUE},
  toastContainer: {
    width: '100%',
    backgroundColor: WHITE,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 15,
    overflow: 'hidden',
  },
  toastInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
  },
  toastIcon: {fontSize: 24, color: BLACK},
  toastMessageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 5,
  },
  toastMessage: {},
  toastHeader: {marginBottom: 3},
});

export default App;
