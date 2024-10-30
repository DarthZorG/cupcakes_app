/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
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
type PropsType = NativeStackScreenProps<HomeStackParamList, 'Home'>;

function HomeScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const {data: products, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: ProductService.getProducts,
  });

  return (
    <SafeAreaView style={styles.container}>
      <SearchField placeHolder="O que está procurando?" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <ProductCard />
          <ProductCard />
        </View>
      </ScrollView>
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
