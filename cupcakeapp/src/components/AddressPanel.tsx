/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {WHITE} from '../config/colors';
import FormField from './FormField';
import {Address} from '../models/Address';

export interface AddressPanelProps {
  address: Address;
  onChange: (data: Address) => void;
  style?: StyleProp<ViewStyle>;
}

function AddressPanel(props: AddressPanelProps): JSX.Element {
  return (
    <View style={[styles.innerContainer, props.style]}>
      <FormField
        title="CEP"
        value={props.address.zipCode}
        onChange={(value: string) => {
          props.onChange({...props.address, zipCode: value});
        }}
      />
      <FormField
        title="Rua"
        value={props.address.address}
        onChange={(value: string) => {
          props.onChange({...props.address, address: value});
        }}
      />
      <FormField
        title="Complemento"
        value={props.address.addressExtended}
        onChange={(value: string) => {
          props.onChange({...props.address, addressExtended: value});
        }}
      />
      <FormField
        title="Bairro"
        value={props.address.neighborhood}
        onChange={(value: string) => {
          props.onChange({...props.address, neighborhood: value});
        }}
      />
      <FormField
        title="Cidade"
        value={props.address.city}
        onChange={(value: string) => {
          props.onChange({...props.address, city: value});
        }}
      />
      <FormField
        title="Stato"
        value={props.address.state}
        onChange={(value: string) => {
          props.onChange({...props.address, state: value});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: WHITE,
  },
});

export default AddressPanel;
