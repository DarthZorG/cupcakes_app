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

type PropsType = NativeStackScreenProps<AdminStackParamList, 'Products'>;

function ProductsScreen(props: PropsType): JSX.Element {
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
      <View style={styles.pageHeader}>
        <BoldText style={styles.headerText}>Produtos</BoldText>
      </View>
      <SearchField placeHolder="procura.." />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <AdminProductCard />
          <AdminProductCard />
          <AdminProductCard />
          <AdminProductCard />
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
