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
import {BLACK, BLUE, GRAY, LIGHT_BLUE, RED, WHITE} from '../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BoldText, DefaultText} from './StyledTexts';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import CartItemCard from './CartItemCard';

export type AdminOrderCardProps = {
  showDetails?: boolean;
  onEdit?: () => void;
};

const AdminOrderCard = (props: AdminOrderCardProps): JSX.Element => {
  const showDetails = props.showDetails ?? false;

  return (
    <View style={[styles.cardContainer]}>
      <View style={styles.infoContainer}>
        <View style={styles.dataContainer}>
          <View style={styles.textContainer}>
            <BoldText style={styles.productName}>
              {'Pedido del: 29/05/2024'}
            </BoldText>
            <DefaultText style={styles.flavor}>{'Valor: R$ 40,00'}</DefaultText>
            <DefaultText style={styles.flavor}>
              {'Entrega: Retirar na loja'}
            </DefaultText>
            <DefaultText style={styles.flavor}>
              {'Status: Pedido pago'}
            </DefaultText>
          </View>
        </View>
        {!showDetails ? (
          <View style={styles.priceContainer}>
            <TouchableOpacity onPress={() => {}}>
              <BoldText style={styles.price}>{'Detalhes do pedido'}</BoldText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.detailsContainer}>
            <CartItemCard allowEdit={false} />
            <CartItemCard allowEdit={false} />
          </View>
        )}
      </View>
      <View style={styles.priceContainer}>
        <TouchableOpacity onPress={props.onEdit}>
          <View style={styles.buttonContainer}>
            <Material
              style={{alignItems: 'center', color: LIGHT_BLUE}}
              name={'file-edit-outline'}
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
            <DefaultText style={styles.delete}>{'Cancelar pedido'}</DefaultText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminOrderCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'column',
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
    justifyContent: 'center',
    paddingRight: 10,
    paddingBottom: 4,
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5,
    paddingBottom: 5,
  },
  price: {
    fontSize: 14,
    paddingRight: 10,
    color: BLUE,
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
});
