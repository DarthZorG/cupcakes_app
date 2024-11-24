/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, {useMemo} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CartStackParamList} from '../../navigation/CartStackNAvigator';
import CartItemCard from '../../components/CartItemCard';
import {BLUE, GRAY, WHITE} from '../../config/colors';
import CustomButton from '../../components/CustomButton';
import {BoldText, DefaultText} from '../../components/StyledTexts';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../../store/reducers';
import {FavoriteCollection} from '../../store/reducers/FavoritesReducer';
import {CartCollection, CartItem} from '../../store/reducers/CartReducer';
import {updateCartItem} from '../../store/actions/CartActions';
import {toLinearSpace} from 'react-native-reanimated/lib/typescript/Colors';
import {Product} from '../../models/Product';
import {showAlert} from '../../store/actions/AlertActions';

type PropsType = NativeStackScreenProps<CartStackParamList, 'CartHome'>;

function CartMainScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();

  const cartItems = useSelector((state: StoreState): CartCollection => {
    return state.cart.items;
  });

  const items = useMemo(() => {
    const items: CartItem[] = [];
    for (let pKey in cartItems) {
      items.push(cartItems[pKey]);
    }
    return items;
  }, [cartItems]);

  const totals = useMemo(() => {
    const totals = {quantity: 0, amount: 0};
    for (let pKey in cartItems) {
      totals.quantity += cartItems[pKey].quantity;
      totals.amount += cartItems[pKey].quantity * cartItems[pKey].product.price;
    }
    return totals;
  }, [cartItems]);

  const goToHome = () => {
    props.navigation.navigate('HomeStack', {
      screen: 'Home',
    });
  };

  const askRemove = (product: Product) => {
    dispatch(
      showAlert(
        'Remover',
        'Quer remover o iten "' + product.name + '" do carrinho?',
        [
          {
            text: 'Não',
            onPress: () => {},
          },
          {
            text: 'Sim',
            onPress: () => {
              dispatch(updateCartItem(product, 0));
            },
          },
        ],
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {items.length < 1 ? (
        <View style={styles.emptyListMessageContainer}>
          <BoldText style={styles.emptyListMessage}>
            Il tuo carrinho está vazio!
          </BoldText>
          <TouchableOpacity onPress={goToHome}>
            <DefaultText style={styles.goHomeMessage}>
              Ir as compras
            </DefaultText>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          style={styles.scrollview}
          data={items}
          renderItem={({item}) => {
            return (
              <CartItemCard
                product={item.product}
                quantity={item.quantity}
                allowEdit={true}
                onDecreaseQuantity={() => {
                  if (item.quantity > 1) {
                    dispatch(updateCartItem(item.product, item.quantity - 1));
                  }
                }}
                onIncreaseQuantity={() => {
                  dispatch(updateCartItem(item.product, item.quantity + 1));
                }}
                onRemoveItem={() => {
                  askRemove(item.product);
                }}
              />
            );
          }}
        />
      )}
      <View style={styles.bottomResume}>
        <View style={styles.resumeContainer}>
          <View style={styles.resumeLine}>
            <DefaultText>Total de itens:</DefaultText>
            <BoldText style={styles.leftColumn}>
              {totals.quantity.toFixed(0)}
            </BoldText>
          </View>
          <View style={styles.resumeLine}>
            <DefaultText>Total da compra:</DefaultText>
            <BoldText style={styles.leftColumn}>
              {'R$ ' +
                totals.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </BoldText>
          </View>
        </View>
        <CustomButton
          title="Finalizar pedido"
          onPress={() => {
            props.navigation.navigate('FinalizeOrder');
          }}
          enabled={items.length > 0}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollview: {
    backgroundColor: WHITE,
  },
  emptyListMessageContainer: {
    flex: 1,
    backgroundColor: WHITE,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListMessage: {
    fontSize: 22,
  },
  goHomeMessage: {
    fontSize: 22,
    color: BLUE,
    marginTop: 10,
  },
  innerContainer: {
    backgroundColor: WHITE,
  },
  bottomResume: {
    borderTopColor: GRAY,
    borderTopWidth: 1,
  },
  leftColumn: {
    minWidth: 80,
    textAlign: 'right',
  },
  resumeContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingVertical: 10,
  },
  resumeLine: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
});

export default CartMainScreen;
