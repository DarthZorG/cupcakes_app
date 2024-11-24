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
import {Product} from '../../models/Product';
import {
  addFavorite,
  getFavoriteKey,
  removeFavorite,
} from '../../store/actions/FavoriteActions';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../../store/reducers';
import {FavoriteCollection} from '../../store/reducers/FavoritesReducer';
import {addItemToCart} from '../../store/actions/CartActions';
import {ProfileStackParamList} from '../../navigation/ProfileStackNavigator';
import { BoldText, DefaultText } from '../../components/StyledTexts';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'MyFavorites'>;

function MyFavoritesScreen(props: PropsType): React.ReactNode {
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
      {(items ?? []).length < 1 ? (
        <View style={styles.emptyListMessageContainer}>
          <BoldText style={styles.emptyListMessage}>
            Você não tem nenhum produto favorito!
          </BoldText>
        </View>
      ) : (
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
      )}
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
});

export default MyFavoritesScreen;
