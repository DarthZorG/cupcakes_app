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
import {GRAY, WHITE} from '../../config/colors';
import CustomButton from '../../components/CustomButton';
import {BoldText, DefaultText} from '../../components/StyledTexts';

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
      <View style={styles.bottomResume}>
        <View style={styles.resumeContainer}>
          <View style={styles.resumeLine}>
            <DefaultText>Total de itens:</DefaultText>
            <BoldText style={styles.leftColumn}>3</BoldText>
          </View>
          <View style={styles.resumeLine}>
            <DefaultText>Total da compra:</DefaultText>
            <BoldText style={styles.leftColumn}>R$ 13.50</BoldText>
          </View>
        </View>
        <CustomButton
          title="Finalizar pedido"
          onPress={() => {
            props.navigation.navigate('FinalizeOrder');
          }}
        />
      </View>
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
    borderTopColor: GRAY,
    borderTopWidth: 1,
  },
  leftColumn: {
    minWidth: 80,
    textAlign: 'right',
  },
  resumeContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingVertical: 10,
  },
  resumeLine: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
});

export default CartMainScreen;
