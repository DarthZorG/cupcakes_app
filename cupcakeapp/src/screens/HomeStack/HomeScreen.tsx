/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../navigation/HomeStackNavigator';
import {WHITE} from '../../config/colors';
import SearchField from '../../components/SearchField';
import ProductCard from '../../components/ProductCard';
import {useQuery} from '@tanstack/react-query';
import ProductService from '../../services/ProductService';
import {useDispatch, useSelector} from 'react-redux';
import {startLoading, stopLoading} from '../../store/actions/LoaderActions';
import {Product} from '../../models/Product';
import {StoreState} from '../../store/reducers';
import {FavoriteCollection} from '../../store/reducers/FavoritesReducer';
import Toast from 'react-native-toast-message';

import {
  addFavorite,
  getFavoriteKey,
  removeFavorite,
} from '../../store/actions/FavoriteActions';
import {addItemToCart} from '../../store/actions/CartActions';
type PropsType = NativeStackScreenProps<HomeStackParamList, 'Home'>;

function HomeScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const favorites = useSelector((state: StoreState): FavoriteCollection => {
    return state.favorites.items;
  });
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      return await ProductService.getProducts();
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <SearchField placeHolder="O que está procurando?" />
      <FlatList
        style={styles.scrollview}
        data={products}
        renderItem={({item}) => {
          return (
            <ProductCard
              item={item}
              isFavorite={favorites[getFavoriteKey(item)] != null}
              onToggleFavorite={() => {
                if (favorites[getFavoriteKey(item)] != null) {
                  dispatch(removeFavorite(item));
                } else {
                  dispatch(addFavorite(item));
                }
              }}
              onAddToCart={() => {
                dispatch(addItemToCart(item));
                Toast.show({
                  type: 'cartToast',
                  text1: item.name,
                  text2: 'foi adicionado ao carrinho!',
                  autoHide: true,
                  onPress: () => {
                    Toast.hide();
                  },
                });
              }}
            />
          );
        }}
        refreshing={isLoading}
        onRefresh={() => {
          refetch();
        }}
      />
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
  innerContainer: {
    backgroundColor: WHITE,
  },
});

export default HomeScreen;
