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
import {RadioGroup} from 'react-native-radio-buttons-group';
import FormRadio from '../../components/FormRadio';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';

type PropsType = NativeStackScreenProps<AdminStackParamList, 'EditOrder'>;

function FinalizeOrderScreen(props: PropsType): JSX.Element {
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
      <PageHeader title="Finalizar Pedido" />
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
          <FormField title="Nome impresso no cartão" value="John Doe" />
          <FormField title="Numero do cartao" value="0000-0000-0000-0000" />
          <FormField title="validade" value="00/00" />
          <FormField title="CVV" value="000" />
        </View>
      </ScrollView>
      <View>
        <CustomButton title="Finalizar" onPress={() => {}} />
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
});

export default FinalizeOrderScreen;
