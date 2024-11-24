/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, {useCallback} from 'react';
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
import {ProfileStackParamList} from '../../navigation/ProfileStackNavigator';
import {BLACK, LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import {BoldText, DefaultText} from '../../components/StyledTexts';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import PageHeader from '../../components/PageHeader';
import {useQuery} from '@tanstack/react-query';
import AddressService from '../../services/AddressService';
import {useFocusEffect} from '@react-navigation/native';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'MyAddresses'>;

function MyAddressesScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {
    data: addresses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      return await AddressService.getAddresses();
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
        return (
          <TouchableOpacity
            testID="navigate_add_address"
            onPress={() => {
              props.navigation.navigate('EditAddress');
            }}>
            <Material
              style={{color: BLACK}}
              name={'map-marker-plus'}
              size={20}
            />
          </TouchableOpacity>
        );
      },
    });
  }, [props.navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Os Meus Endereços" />
      {(addresses ?? []).length < 1 ? (
        <View style={styles.emptyListMessageContainer}>
          <BoldText style={styles.emptyListMessage}>
            Nenhum endereço no sistema!
          </BoldText>

          <DefaultText style={styles.goHomeMessage}>
            Clique no botão adicionar endereço no canto superior direito.
          </DefaultText>
        </View>
      ) : (
        <FlatList
          style={styles.scrollview}
          data={addresses}
          renderItem={({item}) => {
            return (
              <MenuItem
                title={item.address}
                description={
                  '' +
                  (item.zipCode ?? '') +
                  ' ' +
                  (item.neighborhood ?? '') +
                  ', ' +
                  (item.city ?? '') +
                  ' ' +
                  (item.state ?? '')
                }
                onPress={() => {
                  props.navigation.navigate('EditAddress', {address: item});
                }}
              />
            );
          }}
          refreshing={isLoading}
          onRefresh={() => {
            refetch();
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
    flex: 1,
  },
  innerContainer: {
    backgroundColor: WHITE,
  },
  pageHeader: {
    height: 60,
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: BLACK,
    marginTop: 10,
  },
});

export default MyAddressesScreen;
