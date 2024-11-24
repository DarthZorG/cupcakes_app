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
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../../navigation/ProfileStackNavigator';
import {BLUE, LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import {BoldText, DefaultText} from '../../components/StyledTexts';
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

  const goToHome = () => {
    props.navigation.navigate('HomeStack', {
      screen: 'Home',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Os Meus Pedidos" />
      {(orders ?? []).length < 1 ? (
        <View style={styles.emptyListMessageContainer}>
          <BoldText style={styles.emptyListMessage}>
            Você não tem nenuhm pedido!
          </BoldText>
          <TouchableOpacity onPress={goToHome}>
            <DefaultText style={styles.goHomeMessage}>
              Ir as compras
            </DefaultText>
          </TouchableOpacity>
        </View>
      ) : (
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
      )}
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
  emptyListMessageContainer: {
    flex: 1,
    backgroundColor: WHITE,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListMessage: {
    fontSize: 22,
  },
  goHomeMessage: {
    fontSize: 22,
    color: BLUE,
    marginTop: 10,
  },
});

export default MyOrdersScreen;
