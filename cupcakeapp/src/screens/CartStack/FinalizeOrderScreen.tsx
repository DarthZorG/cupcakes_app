/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, {useEffect, useMemo, useState} from 'react';
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
import {PaymentMethod} from '../../models/PaymentMethod';
import {DeliveryMethod} from '../../models/DeliveryMethod';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../../store/actions/LoaderActions';
import PaymentMethodService from '../../services/PaymentMethodService';
import {useQuery} from '@tanstack/react-query';
import DeliveryMethodService from '../../services/DeliveryMethodService';

type PropsType = NativeStackScreenProps<AdminStackParamList, 'EditOrder'>;

function FinalizeOrderScreen(props: PropsType): JSX.Element {
  const dispatch = useDispatch();
  const [selectedDelivery, setSelectedDelivery] = useState('1');
  const [selectedPayment, setSelectedPayment] = useState('1');

  const {data: paymentMethods, isLoading: isLoadingPayments} = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: async () => {
      return await PaymentMethodService.getPaymentMethods();
    },
  });

  const {data: deliveryMethods, isLoading: isLoadingDelivery} = useQuery({
    queryKey: ['deliveryMethods'],
    queryFn: async () => {
      return await DeliveryMethodService.getDeliveryMethods();
    },
  });

  useEffect(() => {
    if (isLoadingDelivery || isLoadingPayments) {
      dispatch(startLoading());
      return () => {
        dispatch(stopLoading());
      };
    }
    return undefined;
  }, [isLoadingDelivery, isLoadingPayments]);

  const deliveryOptions = useMemo(() => {
    return (
      deliveryMethods?.map(e => ({
        id: e.id.toString(),
        label: e.name,
        value: e.id.toString(),
      })) ?? []
    );
  }, [deliveryMethods]);

  const paymentOptions = useMemo(() => {
    return (
      paymentMethods?.map(e => ({
        id: e.id.toString(),
        label: e.name,
        value: e.id.toString(),
      })) ?? []
    );
  }, [paymentMethods]);

  /*const deliveryMethods = useMemo(
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
  ); */

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Finalizar Pedido" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <FormRadio
            title={'Entrega:'}
            options={deliveryOptions}
            selectedId={selectedDelivery}
            onChange={delivery => {
              setSelectedDelivery(delivery);
            }}
          />
          <FormField title="CEP" value="80000-000" />
          <FormField title="Rua" value="Rua Antonio de Paula, 400 " />
          <FormField title="Complemento" value="" />
          <FormField title="Bairro" value="Hauer" />
          <FormField title="Cidade" value="Curitba" />

          <FormRadio
            title={'Metodo de pagamento:'}
            options={paymentOptions}
            selectedId={selectedPayment}
            onChange={payment => {
              setSelectedPayment(payment);
            }}
          />
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
