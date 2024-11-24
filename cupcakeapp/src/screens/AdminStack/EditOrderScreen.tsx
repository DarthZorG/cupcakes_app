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
import {startLoading, stopLoading} from '../../store/actions/LoaderActions';
import {useDispatch} from 'react-redux';
import {Address} from '../../models/Address';
import AddressService from '../../services/AddressService';
import {CardDetails} from '../../models/CardDetails';
import OrderService from '../../services/OrderService';
import {OrderItem} from '../../models/Order';
import {showAlert} from '../../store/actions/AlertActions';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorHelper from '../../Errors/ErrorHelper';
import {Dropdown} from 'react-native-element-dropdown';
import AddressPanel from '../../components/AddressPanel';

type PropsType = NativeStackScreenProps<AdminStackParamList, 'EditOrder'>;

interface OrderStatusInfo {
  text: string;
  value: string;
}

function EditOrderScreen(props: PropsType): JSX.Element {
  const order = props.route.params?.order;

  const dispatch = useDispatch();
  const [selectedDelivery, setSelectedDelivery] = useState(
    order.deliveryMethodId?.toString() ?? '1',
  );
  const [selectedPayment, setSelectedPayment] = useState(
    order.paymentMethodId?.toString() ?? '1',
  );
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [editingAddress, setEditingAddress] = useState<Address>(
    AddressService.getEmptyAddress(),
  );

  const orderStatuses = useMemo(() => {
    return ['CREATED', 'CANCELLED', 'PAID', 'SENT', 'DELIVERED'].map(
      (e): OrderStatusInfo => ({
        value: e,
        text: OrderService.getStatusString(e),
      }),
    );
  }, []);

  const [orderStatus, setOrderStatus] = useState<OrderStatusInfo | undefined>(
    orderStatuses.find(e => e.value === order.status),
  );

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
    queryKey: ['addresses-for-user', order.userId],
    queryFn: async () => {
      return await AddressService.getAddressesForUser(order.userId ?? '');
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

  useEffect(() => {
    const myAddresses = addresses ?? [];
    if (myAddresses.length > 0) {
      const selected = myAddresses.find(e => e.id === order.addressId);
      if (selected != null) {
        setSelectedAddress(selected);
      }
    }
  }, [addresses]);

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

  const deliveryMode = useMemo(() => {
    return deliveryMethods?.find(e => e.id.toString() === selectedDelivery);
  }, [selectedDelivery, deliveryMethods]);

  const paymentMode = useMemo(() => {
    return paymentMethods?.find(e => e.id.toString() === selectedPayment);
  }, [selectedPayment, paymentMethods]);

  const getAddressId = async () => {
    var addr = addresses?.find(e => AddressService.isSame(e, editingAddress));
    if (addr != null) {
      return addr.id;
    }
    const newAddr = await AddressService.addAddressForUser(
      order.userId!,
      editingAddress,
    );
    return newAddr.id;
  };

  const updateOrder = async () => {
    try {
      dispatch(startLoading());
      console.log(order);
      const updatedOrder = {
        ...order,
        paymentMethodId: paymentMode?.id ?? -1,
        deliveryMethodId: deliveryMode?.id ?? -1,
        status: orderStatus?.value ?? order.status,
      };

      if (deliveryMode?.requireAddress) {
        updatedOrder.addressId = await getAddressId();
      }
 
      await OrderService.updateOrder(updatedOrder);
      dispatch(stopLoading());
      dispatch(
        showAlert('Pedido atualizado!', null, [
          {
            text: 'Ok',
            onPress: () => {
              props.navigation.navigate('Orders');
            },
          },
        ]),
      );
    } catch (e: any) {
      console.log(e);
      ErrorHelper.handleError(e, dispatch);
    }
  };

  const renderItem = (item: Address) => {
    return (
      <View style={styles.item}>
        <MenuItem
          title={item.address}
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

  const renderStatusItem = (item: OrderStatusInfo) => {
    return (
      <View style={styles.item}>
        <MenuItem
          title={item.text}
          hasRightArrow={false}
          containerStyle={{width: null, flex: 1, paddingHorizontal: 10}}
          hasBottomBorder={false}
        />
        {item.value === orderStatus?.value && (
          <Material style={styles.icon} color={BLACK} name="check" size={20} />
        )}
      </View>
    );
  };

  useEffect(() => {
    if (selectedAddress != null) {
      setEditingAddress({...selectedAddress});
    }
  }, [selectedAddress]);

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
                labelField="address"
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
              <AddressPanel
                address={editingAddress}
                onChange={(data: Address) => {
                  setEditingAddress(data);
                }}
              />
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
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          containerStyle={styles.listContainer}
          iconStyle={styles.iconStyle}
          data={orderStatuses}
          maxHeight={300}
          labelField="text"
          valueField="value"
          placeholder="Estado do pedido"
          searchPlaceholder="Search..."
          dropdownPosition="top"
          value={orderStatus}
          onChange={item => {
            setOrderStatus(item);
          }}
          renderItem={renderStatusItem}
        />
      </ScrollView>
      <View>
        <CustomButton
          title="Salvar pedido"
          onPress={() => {
            updateOrder();
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

export default EditOrderScreen;
