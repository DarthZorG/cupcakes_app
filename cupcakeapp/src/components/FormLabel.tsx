import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {BLACK, BLUE, GRAY, WHITE} from '../config/colors';
import {BoldText, DefaultText} from './StyledTexts';

export type FormLabelProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  value: string;
};

const FormLabel = (props: FormLabelProps): JSX.Element => {
  return (
    <View style={[styles.container, props.style]}>
      <BoldText style={styles.label}>{props.title}</BoldText>
      <DefaultText style={styles.input}>{props.value}</DefaultText>
    </View>
  );
};

export default FormLabel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: WHITE,
    color: BLACK,
    width: '100%',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
});
