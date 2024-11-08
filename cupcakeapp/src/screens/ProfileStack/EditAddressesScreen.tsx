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
import ErrorHelper from '../../Errors/ErrorHelper';
import AddressPanel from '../../components/AddressPanel';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'EditAddress'>;

function EditAddressScreen(props: PropsType): JSX.Element {
  const dispatch = useDispatch();
  const [editingAddress, setEditingAddress] = useState<Address>({
    ...AddressService.getEmptyAddress(),
    ...props.route.params?.address,
  });

  const onSaveAddress = async () => {
    dispatch(startLoading());

    const newAddress: Address = {
      ...editingAddress,
      id: props.route.params?.address?.id ?? 0,
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
      ErrorHelper.handleError(e, dispatch);
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
        <AddressPanel
          address={editingAddress}
          onChange={(data: Address) => {
            setEditingAddress(data);
          }}
        />
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
