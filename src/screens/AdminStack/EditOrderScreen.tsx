/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, {useMemo} from 'react';
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
import {AdminStackParamList} from '../../navigation/AdminStackNavigator';
import CustomButton from '../../components/CustomButton';
import AdminOrderCard from '../../components/AdminOrderCard';
import FormRadio from '../../components/FormRadio';
import FormField from '../../components/FormField';
import CartItemCard from '../../components/CartItemCard';
import PageHeader from '../../components/PageHeader';

type PropsType = NativeStackScreenProps<AdminStackParamList, 'EditOrder'>;

function EditOrderScreen(props: PropsType): JSX.Element {
  const deliveryMethods = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Retirada na loja',
        value: 'option1',
      },
      {
        id: '2',
        label: 'Entrega por motoboy',
        value: 'option2',
      },
    ],
    [],
  );

  const paymentOptions = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Cartão de credito (online)',
        value: 'option1',
      },
      {
        id: '2',
        label: 'Pix',
        value: 'option2',
      },
      {
        id: '3',
        label: 'Cartão de credito (na entrega)',
        value: 'option3',
      },
      {
        id: '4',
        label: 'Em dinheiro na entrega',
        value: 'option4',
      },
    ],
    [],
  );
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Editar pedido" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <FormRadio title={'Entrega:'} options={deliveryMethods} />
          <FormField title="CEP" value="80000-000" />
          <FormField title="Rua" value="Rua Antonio de Paula, 400 " />
          <FormField title="Complemento" value="" />
          <FormField title="Bairro" value="Hauer" />
          <FormField title="Cidade" value="Curitba" />

          <FormRadio title={'Metodo de pagamento:'} options={paymentOptions} />
          <BoldText style={styles.itemsLabel}>Itens do pedido</BoldText>
          <CartItemCard allowEdit={true} />
          <CartItemCard allowEdit={true} />
        </View>
      </ScrollView>
      <View>
        <CustomButton title="Salvar" onPress={() => {}} />
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
  itemsLabel: {
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 5,
  },
});

export default EditOrderScreen;
