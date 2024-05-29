// @ts-ignore
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {baseHeaderStyle} from '../config/styles';

import {useSelector} from 'react-redux';
import {StoreState} from '../store/reducers';
import ProfileMainScreen from '../screens/ProfileStack/ProfileMainScreen';

export type ProfileStackParamList = {
  ProfileHome: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = (): JSX.Element => {
  const isAuthenticated = useSelector((state: StoreState): boolean => {
    return state.auth.token != null;
  });
  return (
    <ProfileStack.Navigator screenOptions={baseHeaderStyle}>
      <ProfileStack.Screen name={'ProfileHome'} component={ProfileMainScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
