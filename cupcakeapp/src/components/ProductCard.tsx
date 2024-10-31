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
import {BLACK, GRAY, LIGHT_BLUE, RED, WHITE} from '../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BoldText, DefaultText} from './StyledTexts';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import QuantityInput from './QuatityInput';
import {Product} from '../models/ProductResponses';

export type ProductCardProps = {
  item: Product;
  isAdmin?: boolean;
};

const ProductCard = (props: ProductCardProps): JSX.Element => {
  const image =
    props.item.picture?.uri != null
      ? {uri: props.item.picture?.uri}
      : require('../../assets/images/cupcake.jpg');

  const isAdmin = props.isAdmin ?? false;

  return (
    <View style={[styles.cardContainer]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.dataContainer}>
          <View style={styles.textContainer}>
            <BoldText style={styles.productName}>{props.item.name}</BoldText>
            <DefaultText style={styles.flavor}>
              {'Sabor:  ' + props.item.flavor}
            </DefaultText>
            {isAdmin && (
              <DefaultText style={styles.flavor}>
                {'Preço: R$ ' + props.item.price.toFixed(2)}
              </DefaultText>
            )}
            <DefaultText style={styles.badge}>{'Sem açucar'}</DefaultText>
          </View>
          {!isAdmin && (
            <View style={styles.favouriteContainer}>
              <TouchableOpacity onPress={() => {}}>
                <Ionicons
                  style={{alignItems: 'center', color: '#FF0000'}}
                  name={'heart-outline'}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.priceContainer}>
          {isAdmin ? (
            <>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.buttonContainer}>
                  <Material
                    style={{alignItems: 'center', color: LIGHT_BLUE}}
                    name={'cookie-edit-outline'}
                    size={15}
                  />
                  <DefaultText style={styles.edit}>{'Edit'}</DefaultText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.buttonContainer}>
                  <Material
                    style={{alignItems: 'center', color: RED}}
                    name={'trash-can-outline'}
                    size={15}
                  />
                  <DefaultText style={styles.delete}>
                    {'Remover produto'}
                  </DefaultText>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <BoldText style={styles.price}>
                {'R$ ' + props.item.price.toFixed(2)}
              </BoldText>
              <TouchableOpacity onPress={() => {}}>
                <Material
                  style={{alignItems: 'center', color: BLACK}}
                  name={'cart-plus'}
                  size={27}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

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
    height: 140,
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
    fontSize: 24,
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 14,
  },
  delete: {
    color: RED,
    fontSize: 10,
  },
  edit: {
    color: LIGHT_BLUE,
    fontSize: 10,
  },
  productName: {},
  flavor: {},
});
