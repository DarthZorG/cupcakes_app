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
import PaymentMethodService from '../../services/PaymentMethodService';
import {useQuery} from '@tanstack/react-query';
import DeliveryMethodService from '../../services/DeliveryMethodService';

type PropsType = NativeStackScreenProps<AdminStackParamList, 'EditOrder'>;

function EditOrderScreen(props: PropsType): JSX.Element {
  const order = props.route.params?.order;

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

  const deliveryOptions = useMemo(() => {
    return (
      deliveryMethods?.map(e => ({
        id: e.id.toString(),
        label:
          e.name +
          ' (R$ ' +
          e.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) +
          ')',
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

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Editar pedido" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <FormRadio title={'Entrega:'} options={deliveryOptions} />
          <FormField title="CEP" value="80000-000" />
          <FormField title="Rua" value="Rua Antonio de Paula, 400 " />
          <FormField title="Complemento" value="" />
          <FormField title="Bairro" value="Hauer" />
          <FormField title="Cidade" value="Curitba" />

          <FormRadio title={'Metodo de pagamento:'} options={paymentOptions} />
          <BoldText style={styles.itemsLabel}>Itens do pedido</BoldText>
          {order?.items.map(e => {
            return (
              <CartItemCard
                key={e.productId}
                allowEdit={true}
                product={e.product!}
                quantity={e.quantity}
              />
            );
          })}
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
