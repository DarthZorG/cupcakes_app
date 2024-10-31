/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, {useEffect} from 'react';
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
import {BLACK, LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import {BoldText} from '../../components/StyledTexts';
import {AdminStackParamList} from '../../navigation/AdminStackNavigator';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AdminProductCard from '../../components/AdminProductCard';
import SearchField from '../../components/SearchField';
import PageHeader from '../../components/PageHeader';
import ProductCard from '../../components/ProductCard';
import {useQuery} from '@tanstack/react-query';
import ProductService from '../../services/ProductService';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../../store/actions/LoaderActions';

type PropsType = NativeStackScreenProps<AdminStackParamList, 'Products'>;

function ProductsScreen(props: PropsType): JSX.Element {
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

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            testID="navigate_add_address"
            onPress={() => {
              props.navigation.navigate('EditProduct');
            }}>
            <Material style={{color: BLACK}} name={'cookie-plus'} size={20} />
          </TouchableOpacity>
        );
      },
    });
  }, [props.navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Gerenciador de Produtos" />
      <SearchField placeHolder="procura.." />
      <FlatList
        style={styles.scrollview}
        data={products}
        renderItem={({item}) => {
          return (
            <ProductCard
              item={item}
              isAdmin={true}
              onEdit={product => {
                props.navigation.navigate('EditProduct', {item: product});
              }}
              onDelete={product => {
                console.log(product);
              }}
            />
          );
        }}
      />

      {/*    <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <ProductCard isAdmin={true} />
          <ProductCard isAdmin={true} />
          <ProductCard isAdmin={true} />
          <ProductCard isAdmin={true} />
        </View>
      </ScrollView> */}
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
    flex: 1,
  },
  innerContainer: {
    backgroundColor: WHITE,
  },
  pageHeader: {
    backgroundColor: WHITE,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
  },
});

export default ProductsScreen;
