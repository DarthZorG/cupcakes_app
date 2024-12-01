/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';

type PropsType = NativeStackScreenProps<AdminStackParamList, 'Products'>;

const AddProductHeader = (props: PropsType) => {
  return (
    <TouchableOpacity
      testID="navigate_add_address"
      onPress={() => {
        props.navigation.navigate('EditProduct', {
          item: {
            id: 0,
            name: '',
            price: 0,
            flavor: '',
            description: '',
            enabled: true,
            glutenFree: false,
            lactoseFree: false,
            sugarFree: false,
            displayOrder: 9999,
            updatedAt: null,
            createdAt: null,
            imageId: null,
          },
        });
      }}>
      <Material style={{color: BLACK}} name={'cookie-plus'} size={20} />
    </TouchableOpacity>
  );
};

function ProductsScreen(props: PropsType): JSX.Element {
  const dispatch = useDispatch();
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products-admin'],
    queryFn: async () => {
      return await ProductService.getProducts(
        undefined,
        undefined,
        undefined,
        true,
      );
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return AddProductHeader(props);
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
        refreshing={isLoading}
        onRefresh={() => {
          refetch();
        }}
        renderItem={({item}) => {
          return (
            <ProductCard
              item={item}
              isAdmin={true}
              onEdit={() => {
                props.navigation.navigate('EditProduct', {item});
              }}
              onDelete={() => {
                console.log(item);
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
