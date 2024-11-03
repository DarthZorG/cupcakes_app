import React, {Fragment} from 'react';
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
import {BLACK, GRAY, LIGHT_BLUE, WHITE} from '../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BoldText, DefaultText} from './StyledTexts';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import QuantityInput from './QuatityInput';
import {CartItem} from '../store/reducers/CartReducer';

export interface CartItemCardProps extends CartItem {
  allowEdit: boolean;
}

const CartItemCard = (props: CartItemCardProps): JSX.Element => {
  const allowEdit = props.allowEdit ?? true;

  const image =
    props.product.picture?.uri != null
      ? {uri: props.product.picture?.uri}
      : require('../../assets/images/placeholder.jpg');

  return (
    <View style={[styles.cardContainer]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.dataContainer}>
          <View style={styles.textContainer}>
            <BoldText style={styles.productName}>{props.product.name}</BoldText>
            <DefaultText style={styles.flavor}>
              {'Sabor:  ' + props.product.flavor}
            </DefaultText>
            <View style={styles.badgeContainer}>
              {props.product.glutenFree && (
                <DefaultText style={styles.badge}>{'Sem gluten'}</DefaultText>
              )}
              {props.product.lactoseFree && (
                <DefaultText style={styles.badge}>{'Sem lactosio'}</DefaultText>
              )}
              {props.product.sugarFree && (
                <DefaultText style={styles.badge}>{'Sem açucar'}</DefaultText>
              )}
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <BoldText style={styles.price}>
            {'Preço: R$ ' +
              props.product.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
          </BoldText>
          {allowEdit ? (
            <Fragment>
              <QuantityInput
                style={{marginRight: 10}}
                quantity={props.quantity}
              />
              <TouchableOpacity onPress={() => {}}>
                <Material
                  style={{alignItems: 'center', color: '#FF0000'}}
                  name={'trash-can-outline'}
                  size={18}
                />
              </TouchableOpacity>
            </Fragment>
          ) : (
            <BoldText>{'Quantidade: ' + props.quantity.toFixed(0)}</BoldText>
          )}
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    width: '100%',
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
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    aspectRatio: 1,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  favouriteContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  priceContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10,
  },
  price: {
    fontSize: 16,
    paddingRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    backgroundColor: LIGHT_BLUE,
    color: WHITE,
    fontSize: 10,
    paddingVertical: 2,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  productName: {},
  flavor: {},
});
