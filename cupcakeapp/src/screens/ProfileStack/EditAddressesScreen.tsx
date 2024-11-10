/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../../navigation/ProfileStackNavigator';
import {BLACK, LIGHT_BLUE, WHITE} from '../../config/colors';
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
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'EditAddress'>;

function EditAddressScreen(props: PropsType): JSX.Element {
  const dispatch = useDispatch();
  const [editingAddress, setEditingAddress] = useState<Address>({
    ...AddressService.getEmptyAddress(),
    ...props.route.params?.address,
  });

  const headerRight = useCallback(() => {
    const onDelete = () => {
      dispatch(
        showAlert('Remover endereço', 'Quer remover o endereço selectionado?', [
          {text: 'Não', onPress: () => {}, isCancelButton: true},
          {
            text: 'Sim',
            onPress: async () => {
              try {
                await AddressService.deleteAddress(
                  props.route.params?.address?.id ?? -1,
                );
                props.navigation.navigate('MyAddresses');
              } catch {}
            },
          },
        ]),
      );
    };
    return (
      <TouchableOpacity testID="navigate_add_address" onPress={onDelete}>
        <Material style={{color: BLACK}} name={'trash-can-outline'} size={20} />
      </TouchableOpacity>
    );
  }, []);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight,
    });
  }, [props.navigation]);

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
