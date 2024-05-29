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
import {BoldText} from './StyledTexts';
import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';

export type FormRadioProps = {
  style: StyleProp<ViewStyle>;
  title: string;
  options: RadioButtonProps[];
};

const FormRadio = (props: FormRadioProps): JSX.Element => {
  return (
    <View style={[styles.container, props.style]}>
      <BoldText style={styles.label}>{props.title}</BoldText>
      <RadioGroup
        radioButtons={props.options}
        onPress={() => {}}
        selectedId={props.options[0].id}
        labelStyle={{color: BLACK}}
        containerStyle={styles.radioContainer}
      />
    </View>
  );
};

export default FormRadio;

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
  radioContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
