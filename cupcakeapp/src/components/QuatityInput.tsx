import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  StyleProp,
  ViewStyle,
  Image,
  Text,
} from 'react-native';
import {BLACK, BLUE, GRAY, LIGHT_BLUE, WHITE} from '../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BoldText, DefaultText} from './StyledTexts';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

export type QuantityInputProps = {
  style: StyleProp<ViewStyle>;
  quantity: number;
};

const QuantityInput = (props: QuantityInputProps): JSX.Element => {
  return (
    <View style={[styles.inputContainer, props.style]}>
      <View style={styles.quantityButton}>
        <TouchableOpacity onPress={() => {}}>
          <Material
            style={{alignItems: 'center', color: WHITE}}
            name={'minus'}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <BoldText>{props.quantity.toFixed(0)}</BoldText>
      </View>
      <View style={styles.quantityButton}>
        <TouchableOpacity onPress={() => {}}>
          <Material
            style={{alignItems: 'center', color: WHITE}}
            name={'plus'}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuantityInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
  },
  quantityButton: {
    aspectRatio: 1,
    backgroundColor: BLUE,
    padding: 3,
  },
  infoContainer: {
    minWidth: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
