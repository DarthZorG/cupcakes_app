import React, {useState} from 'react';
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
import {Order} from '../models/Order';
import OrderService from '../services/OrderService';

export type OrderCardProps = {
  showDetails?: boolean;
  order: Order;
  isAdmin?: boolean;
  onEdit?: () => void;
};

const OrderCard = (props: OrderCardProps): JSX.Element => {
  const showDetails = props.showDetails ?? false;
  const [expanded, setExpanded] = useState(showDetails);

  const created =
    props.order.createdAt != null ? new Date(props.order.createdAt) : null;

  return (
    <View style={[styles.cardContainer]}>
      <View style={styles.infoContainer}>
        <View style={styles.dataContainer}>
          <View style={styles.textContainer}>
            <BoldText style={styles.productName}>
              {'Pedido del: ' + (created?.toLocaleDateString() ?? '---')}
            </BoldText>
            <DefaultText style={styles.flavor}>
              {'Valor: R$ ' +
                props.order.totalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </DefaultText>
            <DefaultText style={styles.flavor}>
              {'Entrega: ' + (props.order.deliveryMethod?.name ?? '')}
            </DefaultText>
            <DefaultText style={styles.flavor}>
              {'Status: ' + OrderService.getStatusString(props.order.status)}
            </DefaultText>
          </View>
        </View>
        {!expanded ? (
          <View style={styles.priceContainer}>
            <TouchableOpacity
              onPress={() => {
                setExpanded(true);
              }}>
              <BoldText style={styles.price}>{'Detalhes do pedido'}</BoldText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.detailsContainer}>
            {props.order.items.map(e => {
              return (
                <CartItemCard
                  key={e.productId}
                  product={e.product!}
                  quantity={e.quantity}
                  allowEdit={false}
                />
              );
            })}
          </View>
        )}
      </View>
      {props.isAdmin && (
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
              <DefaultText style={styles.delete}>
                {'Cancelar pedido'}
              </DefaultText>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default OrderCard;

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
