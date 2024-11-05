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
  onIncreaseQuantity?: () => void;
  onDecreaseQuantity?: () => void;
  minQuantity?: number;
  maxQuantity?: number;
};

const QuantityInput = (props: QuantityInputProps): JSX.Element => {
  const minQuantity = props.minQuantity ?? 1;
  const maxQuantity = props.maxQuantity ?? 100000;

  return (
    <View style={[styles.inputContainer, props.style]}>
      {props.quantity > minQuantity ? (
        <View style={styles.quantityButton}>
          <TouchableOpacity onPress={props.onDecreaseQuantity}>
            <Material
              style={{alignItems: 'center', color: WHITE}}
              name={'minus'}
              size={20}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.disableQuantityButton}>
          <Material
            style={{alignItems: 'center', color: WHITE}}
            name={'minus'}
            size={20}
          />
        </View>
      )}
      <View style={styles.infoContainer}>
        <BoldText>{props.quantity.toFixed(0)}</BoldText>
      </View>
      {props.quantity < maxQuantity ? (
        <View style={styles.quantityButton}>
          <TouchableOpacity onPress={props.onIncreaseQuantity}>
            <Material
              style={{alignItems: 'center', color: WHITE}}
              name={'plus'}
              size={20}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.disableQuantityButton}>
          <Material
            style={{alignItems: 'center', color: WHITE}}
            name={'plus'}
            size={20}
          />
        </View>
      )}
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
  disableQuantityButton: {
    aspectRatio: 1,
    backgroundColor: GRAY,
    padding: 3,
  },
  infoContainer: {
    minWidth: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
