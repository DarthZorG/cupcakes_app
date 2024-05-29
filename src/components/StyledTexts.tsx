// @ts-ignore
import React from 'react';
import {TextProps, Text, StyleSheet} from 'react-native';
import {BLACK, WHITE} from '../config/colors';

export const DefaultText = (
  props: React.PropsWithChildren<TextProps>,
  // eslint-disable-next-line no-undef
): JSX.Element => {
  return <Text {...props} style={[styles.DefaultTextStyle, props.style]} />;
};

export const BoldText = (
  props: React.PropsWithChildren<TextProps>,
  // eslint-disable-next-line no-undef
): JSX.Element => {
  return <Text {...props} style={[styles.BoldTextStyle, props.style]} />;
};

const styles = StyleSheet.create({
  DefaultTextStyle: {
    color: BLACK,
  },

  BoldTextStyle: {
    color: BLACK,
    fontWeight: 'bold',
  },
});
