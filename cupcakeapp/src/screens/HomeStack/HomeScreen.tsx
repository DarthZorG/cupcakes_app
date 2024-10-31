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
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../../store/actions/LoaderActions';
import {Product} from '../../models/ProductResponses';
type PropsType = NativeStackScreenProps<HomeStackParamList, 'Home'>;

function HomeScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();

  const {data: products, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      return await ProductService.getProducts();
    },
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchField placeHolder="O que está procurando?" />
      <FlatList
        style={styles.scrollview}
        data={products}
        renderItem={({item}) => {
          return <ProductCard item={item} />;
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
