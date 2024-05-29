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
import {CartStackParamList} from '../../navigation/CartStackNAvigator';
import CartItemCard from '../../components/CartItemCard';
import { WHITE } from '../../config/colors';

type PropsType = NativeStackScreenProps<CartStackParamList, 'CartHome'>;

function CartMainScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <CartItemCard />
          <CartItemCard />
          <CartItemCard />
        </View>
      </ScrollView>
      <View style={styles.bottomResume}></View>
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
  },
  innerContainer: {
    backgroundColor: WHITE,
  },
  bottomResume: {
    height: 100,
  },
});

export default CartMainScreen;
