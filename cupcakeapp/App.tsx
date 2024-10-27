/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useMemo} from 'react';
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

function MainApp(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const activeAlert = useSelector(
    (state: StoreState): AlertInfo | null => state.alert.activeAlert,
  );
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
  console.log(activeAlert);
  
  return (
    <>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
      {popupAlert}
    </>
  );
}

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <MainApp />
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
});

export default App;
