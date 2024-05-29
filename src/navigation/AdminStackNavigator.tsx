// @ts-ignore
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {baseHeaderStyle} from '../config/styles';

import {useSelector} from 'react-redux';
import {StoreState} from '../store/reducers';
import AdminMainScreen from '../screens/AdminStack/AdminMainPage';

export type AdminStackParamList = {
  AdminHome: undefined;
};

const AdminStack = createNativeStackNavigator<AdminStackParamList>();

const AdminStackNavigator = (): JSX.Element => {
  const isAuthenticated = useSelector((state: StoreState): boolean => {
    return state.auth.token != null;
  });
  return (
    <AdminStack.Navigator screenOptions={baseHeaderStyle}>
      <AdminStack.Screen
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
        name={'AdminHome'}
        component={AdminMainScreen}
      />
    </AdminStack.Navigator>
  );
};

export default AdminStackNavigator;
