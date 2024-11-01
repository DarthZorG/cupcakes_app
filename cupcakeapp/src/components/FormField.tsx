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
  KeyboardTypeOptions,
  InputModeOptions,
} from 'react-native';
import {BLACK, BLUE, GRAY, WHITE} from '../config/colors';
import {BoldText} from './StyledTexts';

export type FormFieldProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  inputMode?: InputModeOptions;
};

const FormField = (props: FormFieldProps): JSX.Element => {
  return (
    <View style={[styles.container, props.style]}>
      <BoldText style={styles.label}>{props.title}</BoldText>
      <TextInput
        style={styles.input}
        value={props.value}
        keyboardType={props.keyboardType}
        inputMode={props.inputMode}
        onChangeText={text => {
          props.onChange(text);
        }}
      />
    </View>
  );
};

export default FormField;

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
    borderWidth: 1,
    borderColor: GRAY,
    backgroundColor: WHITE,
    borderRadius: 8,
    color: BLACK,
    width: '100%',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
});
