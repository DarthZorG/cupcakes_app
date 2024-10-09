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

export type CartItemCardProps = {
  allowEdit: boolean;
};

const CartItemCard = (props: CartItemCardProps): JSX.Element => {
  const allowEdit = props.allowEdit ?? true;

  return (
    <View style={[styles.cardContainer]}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/cupcake.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.dataContainer}>
          <View style={styles.textContainer}>
            <BoldText style={styles.productName}>{'Floresta negra'}</BoldText>
            <DefaultText style={styles.flavor}>
              {'Sabor: Chocolate com cereja'}
            </DefaultText>
            <DefaultText style={styles.badge}>{'Sem açucar'}</DefaultText>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <BoldText style={styles.price}>{'R$ 4,50'}</BoldText>
          {allowEdit ? (
            <Fragment>
              <QuantityInput style={{marginRight: 10}} />
              <TouchableOpacity onPress={() => {}}>
                <Material
                  style={{alignItems: 'center', color: '#FF0000'}}
                  name={'trash-can-outline'}
                  size={18}
                />
              </TouchableOpacity>
            </Fragment>
          ) : (
            <BoldText>Quantity: 1</BoldText>
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
