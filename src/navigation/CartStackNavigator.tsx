// @ts-ignore
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {baseHeaderStyle} from '../config/styles';

import {useSelector} from 'react-redux';
import {StoreState} from '../store/reducers';
import CartMainScreen from '../screens/CartStack/CartMainScreen';
import FinalizeOrderScreen from '../screens/CartStack/FinalizeOrderScreen';

export type CartStackParamList = {
  CartHome: undefined;
  FinalizeOrder: undefined;
};

const CartStack = createNativeStackNavigator<CartStackParamList>();

const CartStackNavigator = (): JSX.Element => {
  const isAuthenticated = useSelector((state: StoreState): boolean => {
    return state.auth.token != null;
  });
  return (
    <CartStack.Navigator screenOptions={baseHeaderStyle}>
      <CartStack.Screen name={'CartHome'} component={CartMainScreen} />
      <CartStack.Screen
        name={'FinalizeOrder'}
        component={FinalizeOrderScreen}
      />
    </CartStack.Navigator>
  );
};

export default CartStackNavigator;
