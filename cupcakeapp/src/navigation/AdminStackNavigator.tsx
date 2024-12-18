// @ts-ignore
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {baseHeaderStyle} from '../config/styles';

import {useSelector} from 'react-redux';
import {StoreState} from '../store/reducers';
import AdminMainScreen from '../screens/AdminStack/AdminMainPage';
import OrdersScreen from '../screens/AdminStack/OrdersScreen';
import ProductsScreen from '../screens/AdminStack/ProductsScreen';
import EditProductScreen from '../screens/AdminStack/EditProdcutScreen';
import EditOrderScreen from '../screens/AdminStack/EditOrderScreen';
import {Product} from '../models/Product';
import {Order} from '../models/Order';

export type AdminStackParamList = {
  AdminHome: undefined;
  Orders: undefined;
  Products: undefined;
  EditProduct: {item: Product};
  EditOrder: {order: Order};
};

const AdminStack = createNativeStackNavigator<AdminStackParamList>();

const AdminStackNavigator = (): JSX.Element => {
  const isAuthenticated = useSelector((state: StoreState): boolean => {
    return state.auth.token != null;
  });
  return (
    <AdminStack.Navigator screenOptions={baseHeaderStyle}>
      <AdminStack.Screen name={'AdminHome'} component={AdminMainScreen} />
      <AdminStack.Screen name={'Orders'} component={OrdersScreen} />
      <AdminStack.Screen name={'Products'} component={ProductsScreen} />
      <AdminStack.Screen name={'EditProduct'} component={EditProductScreen} />
      <AdminStack.Screen name={'EditOrder'} component={EditOrderScreen} />
    </AdminStack.Navigator>
  );
};

export default AdminStackNavigator;
