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
import {BLACK, GRAY, LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import {BoldText, DefaultText} from '../../components/StyledTexts';
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
import AddressService from '../../services/AddressService';
import {Dropdown} from 'react-native-element-dropdown';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {Address} from '../../models/Address';

type PropsType = NativeStackScreenProps<AdminStackParamList, 'EditOrder'>;

function FinalizeOrderScreen(props: PropsType): JSX.Element {
  const dispatch = useDispatch();
  const [selectedDelivery, setSelectedDelivery] = useState('1');
  const [selectedPayment, setSelectedPayment] = useState('1');
  const [selectedAddress, setSelectedAddress] = useState<Address>();

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

  const {data: addresses, isLoading: isLoadingAddresses} = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      return await AddressService.getAddresses();
    },
  });

  const isLoading =
    isLoadingDelivery || isLoadingPayments || isLoadingAddresses;

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
      return () => {
        dispatch(stopLoading());
      };
    }
    return undefined;
  }, [isLoading]);

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

  const deliveryMode = useMemo(() => {
    return deliveryMethods?.find(e => e.id.toString() === selectedDelivery);
  }, [selectedDelivery, deliveryMethods]);

  const paymentMode = useMemo(() => {
    return paymentMethods?.find(e => e.id.toString() === selectedPayment);
  }, [selectedPayment, paymentMethods]);

  const renderItem = (item: Address) => {
    console.log(item.id === selectedAddress?.id);
    return (
      <View style={styles.item}>
        <MenuItem
          title={item.address1}
          description={
            '' +
            (item.zipCode ?? '') +
            ' ' +
            (item.neighborhood ?? '') +
            ', ' +
            (item.city ?? '') +
            ' ' +
            (item.state ?? '')
          }
          hasRightArrow={false}
          containerStyle={{width: null, flex: 1, paddingHorizontal: 10}}
          hasBottomBorder={false}
        />
        {item.id === selectedAddress?.id && (
          <Material style={styles.icon} color={BLACK} name="check" size={20} />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Finalizar Pedido" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}
        contentContainerStyle={styles.innerContainer}>
        <View style={styles.innerContainer}>
          <FormRadio
            title={'Entrega:'}
            options={deliveryOptions}
            selectedId={selectedDelivery}
            onChange={delivery => {
              setSelectedDelivery(delivery);
            }}
          />
          {deliveryMode?.requireAddress === true && (
            <>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                containerStyle={styles.listContainer}
                iconStyle={styles.iconStyle}
                data={addresses ?? []}
                maxHeight={300}
                labelField="address1"
                valueField="id"
                placeholder="Escolha um endereço"
                searchPlaceholder="Search..."
                value={selectedAddress}
                onChange={item => {
                  if (item === selectedAddress) {
                    setSelectedAddress(undefined);
                  } else {
                    setSelectedAddress(item);
                  }
                }}
                renderLeftIcon={() => (
                  <Material
                    style={{color: BLACK}}
                    name={'map-marker'}
                    size={20}
                  />
                )}
                renderItem={renderItem}
              />

              <FormField title="CEP" value="80000-000" />
              <FormField title="Rua" value="Rua Antonio de Paula, 400 " />
              <FormField title="Complemento" value="" />
              <FormField title="Bairro" value="Hauer" />
              <FormField title="Cidade" value="Curitba" />
            </>
          )}
          <FormRadio
            title={'Metodo de pagamento:'}
            options={paymentOptions}
            selectedId={selectedPayment}
            onChange={payment => {
              setSelectedPayment(payment);
            }}
          />
          {paymentMode?.requireCardInfo === true && (
            <>
              <FormField title="Nome impresso no cartão" value="John Doe" />
              <FormField title="Numero do cartao" value="0000-0000-0000-0000" />
              <FormField title="validade" value="00/00" />
              <FormField title="CVV" value="000" />
            </>
          )}
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
    width: '100%',
  },
  innerContainer: {
    backgroundColor: WHITE,
    width: '100%',
  },
  pageHeader: {
    height: 60,
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  listContainer: {},
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  dropdown: {
    margin: 5,
    height: 60,
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
    color: GRAY,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: BLACK,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default FinalizeOrderScreen;
