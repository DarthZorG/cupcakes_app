/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, { useMemo } from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
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
import PageHeader from '../../components/PageHeader';
import { Product } from '../../models/ProductResponses';
import { addFavorite, getFavoriteKey, removeFavorite } from '../../store/actions/FavoriteActions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/reducers';
import { FavoriteCollection } from '../../store/reducers/FavoritesReducer';
import { addItemToCart } from '../../store/actions/CartActions';

type PropsType = NativeStackScreenProps<HomeStackParamList, 'Home'>;

function MyFavoritesScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const favorites = useSelector((state: StoreState): FavoriteCollection => {
    return state.favorites.items;
  });

  const items = useMemo(() => {
    const items: Product[] = [];
    for (let pKey in favorites) {
      items.push(favorites[pKey]);
    }
    return items;
  }, [favorites]);

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Os Meus Favoritos" />
      <FlatList
        style={styles.scrollview}
        data={items}
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
              }}
            />
          );
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

export default MyFavoritesScreen;
