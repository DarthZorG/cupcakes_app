/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React from 'react';
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

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import {BoldText} from '../../components/StyledTexts';
import { AdminStackParamList } from '../../navigation/AdminStackNavigator';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

type PropsType = NativeStackScreenProps<AdminStackParamList, 'Orders'>;

function OrdersScreen(props: PropsType): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageHeader}>
        <BoldText>Pedidos</BoldText>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}></View>
      </ScrollView>
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
