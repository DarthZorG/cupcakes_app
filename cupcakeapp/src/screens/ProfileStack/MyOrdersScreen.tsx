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
import {ProfileStackParamList} from '../../navigation/ProfileStackNavigator';
import {LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import {BoldText} from '../../components/StyledTexts';
import OrderCard from '../../components/OrderCard';
import PageHeader from '../../components/PageHeader';
import OrderService from '../../services/OrderService';
import {useQuery} from '@tanstack/react-query';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'MyOrders'>;

function MyOrdersScreen(props: PropsType): JSX.Element {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      return await OrderService.getOrders();
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Os Meus Pedidos" />
      <FlatList
        style={styles.scrollview}
        data={orders}
        renderItem={({item}) => {
          return <OrderCard order={item} />;
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

export default MyOrdersScreen;
