/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, {useState} from 'react';
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
import {ProfileStackParamList} from '../../navigation/ProfileStackNavigator';
import {LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import {BoldText} from '../../components/StyledTexts';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';
import {Address} from '../../models/Address';
import AddressService from '../../services/AddressService';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../../store/actions/LoaderActions';
import {APIError} from '../../Errors/APIError';
import {showAlert} from '../../store/actions/AlertActions';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'EditAddress'>;

function EditAddressScreen(props: PropsType): JSX.Element {
  const dispatch = useDispatch();

  const [zipCode, setZipCode] = useState(
    props.route.params?.address?.zipCode ?? '',
  );
  const [address, setAddress] = useState(
    props.route.params?.address?.address1 ?? '',
  );
  const [addressExt, setAddressExt] = useState(
    props.route.params?.address?.addressExtended ?? '',
  );

  const [neighborhood, setNeighborhood] = useState(
    props.route.params?.address?.neighborhood ?? '',
  );
  const [city, setCity] = useState(props.route.params?.address?.city ?? '');

  const [state, setState] = useState(props.route.params?.address?.state ?? '');

  const onSaveAddress = async () => {
    dispatch(startLoading());

    const newAddress: Address = {
      id: props.route.params?.address?.id ?? 0,
      address1: address,
      addressExtended: addressExt,
      city: city,
      zipCode: zipCode,
      state: state,
      neighborhood: neighborhood,
    };

    try {
      if (props.route.params?.address != null) {
        await AddressService.updateAddress(newAddress.id, newAddress);
      } else {
        await AddressService.addAddress(newAddress);
      }
      dispatch(stopLoading());
      props.navigation.navigate('MyAddresses');
    } catch (e: any) {
      dispatch(stopLoading());
      console.log(e);
      if (e instanceof APIError) {
        e.showAlert(dispatch);
      } else {
        dispatch(showAlert('Error', e.message));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader
        title={
          props.route.params?.address != null
            ? 'Editar Endereço'
            : 'Novo Endereço'
        }
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <FormField
            title="CEP"
            value={zipCode}
            onChange={value => {
              setZipCode(value);
            }}
          />
          <FormField
            title="Rua"
            value={address}
            onChange={value => {
              setAddress(value);
            }}
          />
          <FormField
            title="Complemento"
            value={addressExt}
            onChange={value => {
              setAddressExt(value);
            }}
          />
          <FormField
            title="Bairro"
            value={neighborhood}
            onChange={value => {
              setNeighborhood(value);
            }}
          />
          <FormField
            title="Cidade"
            value={city}
            onChange={value => {
              setCity(value);
            }}
          />
          <FormField
            title="Stato"
            value={state}
            onChange={value => {
              setState(value);
            }}
          />
        </View>
      </ScrollView>
      <View>
        <CustomButton title="Salvar" onPress={onSaveAddress} />
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

export default EditAddressScreen;
