// @ts-ignore
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeStack/HomeScreen';

import {baseHeaderStyle} from '../config/styles';

import {useSelector} from 'react-redux';
import {StoreState} from '../store/reducers';

export type HomeStackParamList = {
  Home: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = (): JSX.Element => {
  const isAuthenticated = useSelector((state: StoreState): boolean => {
    return state.auth.token != null;
  });
  return (
    <HomeStack.Navigator screenOptions={baseHeaderStyle}>
      <HomeStack.Screen
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
        name={'Home'}
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
