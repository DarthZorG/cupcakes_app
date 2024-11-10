/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import {BoldText} from '../../components/StyledTexts';
import {AdminStackParamList} from '../../navigation/AdminStackNavigator';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AdminOrderCard from '../../components/AdminOrderCard';
import PageHeader from '../../components/PageHeader';
import OrderService from '../../services/OrderService';
import {useQuery} from '@tanstack/react-query';
import OrderCard from '../../components/OrderCard';

type PropsType = NativeStackScreenProps<AdminStackParamList, 'Orders'>;

function OrdersScreen(props: PropsType): JSX.Element {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['orders-admin'],
    queryFn: async () => {
      return await OrderService.getOrders(
        undefined,
        undefined,
        undefined,
        true,
      );
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Todos os pedidos" />
      <FlatList
        style={styles.scrollview}
        data={orders}
        renderItem={({item}) => {
          return (
            <OrderCard
              order={item}
              isAdmin={true}
              onEdit={() => {
                props.navigation.navigate('EditOrder', {order: item});
              }}
            />
          );
        }}
        refreshing={isLoading}
        onRefresh={() => {
          refetch();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollview: {
    backgroundColor: WHITE,
    flex: 1,
  },
  innerContainer: {
    backgroundColor: WHITE,
  },
  pageHeader: {
    height: 60,
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrdersScreen;
