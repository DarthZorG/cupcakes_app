/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {WHITE} from '../config/colors';
import FormField from './FormField';
import {CardDetails} from '../models/CardDetails';

export interface AddressPanelProps {
  card: CardDetails;
  onChange: (data: CardDetails) => void;
  style?: StyleProp<ViewStyle>;
}

function CardPanel(props: AddressPanelProps): JSX.Element {
  return (
    <View style={[styles.innerContainer, props.style]}>
      <FormField
        title="Nome impresso no cartão"
        value={props.card.holderName}
        onChange={(value: string) => {
          props.onChange({...props.card, holderName: value});
        }}
      />
      <FormField
        title="Numero do cartao"
        value={props.card.number}
        onChange={(value: string) => {
          props.onChange({...props.card, number: value});
        }}
      />
      <FormField
        title="Validade"
        value={props.card.validTill}
        onChange={(value: string) => {
          props.onChange({...props.card, validTill: value});
        }}
      />
      <FormField
        title="CVV"
        value={props.card.cvv}
        onChange={(value: string) => {
          props.onChange({...props.card, cvv: value});
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

export default CardPanel;
