// @ts-ignore
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {baseHeaderStyle} from '../config/styles';

import {useSelector} from 'react-redux';
import {StoreState} from '../store/reducers';
import ProfileMainScreen from '../screens/ProfileStack/ProfileMainScreen';
import MyOrdersScreen from '../screens/ProfileStack/MyOrdersScreen';
import MyAddressesScreen from '../screens/ProfileStack/MyAddressesScreen';
import EditAddressScreen from '../screens/ProfileStack/EditAddressesScreen';
import MyProfileScreen from '../screens/ProfileStack/MyProfileScreen';
import MyFavoritesScreen from '../screens/ProfileStack/MyFavoritesScreen';
import LoginScreen from '../screens/AuthStack/LoginScreen';
import RegisterScreen from '../screens/AuthStack/RegisterScreen';
import {Address} from '../models/Address';

export type ProfileStackParamList = {
  ProfileHome: undefined;
  MyOrders: undefined;
  MyAddresses: undefined;
  EditAddress: {
    address?: Address;
  };
  MyProfile: undefined;
  MyFavorites: undefined;
  Login: undefined;
  Register: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = (): JSX.Element => {
  const isAuthenticated = useSelector((state: StoreState): boolean => {
    return state.auth.token != null;
  });
  return (
    <ProfileStack.Navigator screenOptions={baseHeaderStyle}>
      <ProfileStack.Screen name={'ProfileHome'} component={ProfileMainScreen} />
      <ProfileStack.Screen name={'MyOrders'} component={MyOrdersScreen} />
      <ProfileStack.Screen name={'MyAddresses'} component={MyAddressesScreen} />
      <ProfileStack.Screen name={'EditAddress'} component={EditAddressScreen} />
      <ProfileStack.Screen name={'MyProfile'} component={MyProfileScreen} />
      <ProfileStack.Screen name={'MyFavorites'} component={MyFavoritesScreen} />
      <ProfileStack.Screen name={'Login'} component={LoginScreen} />
      <ProfileStack.Screen name={'Register'} component={RegisterScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
