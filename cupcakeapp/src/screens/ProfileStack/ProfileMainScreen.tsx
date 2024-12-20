/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
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
import {ProfileStackParamList} from '../../navigation/ProfileStackNavigator';
import {LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import CustomButton from '../../components/CustomButton';
import {BoldText} from '../../components/StyledTexts';
import PageHeader from '../../components/PageHeader';
import {IUser} from '../../models/User';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../../store/actions/LoaderActions';
import UserService from '../../services/UsersService';
import {APIError} from '../../Errors/APIError';
import {showAlert} from '../../store/actions/AlertActions';
import ErrorHelper from '../../Errors/ErrorHelper';
import {logout} from '../../store/actions/AuthActions';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

function ProfileMainScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onLogout = () => {
    dispatch(
      showAlert('Sair', 'Quer realmente sair da conta?', [
        {
          text: 'Não',
          onPress: () => {},
          isCancelButton: true,
        },
        {
          text: 'Sim',
          onPress: () => {
            dispatch(logout());
          },
        },
      ]),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Menu Perfil" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <MenuItem
            title="Meus dados"
            onPress={() => {
              props.navigation.navigate('MyProfile');
            }}
          />
          <MenuItem
            title="Meus endereços"
            onPress={() => {
              props.navigation.navigate('MyAddresses');
            }}
          />
          <MenuItem
            title="Meus pedidos"
            onPress={() => {
              props.navigation.navigate('MyOrders');
            }}
          />
          <MenuItem
            title="Meus favoritos"
            onPress={() => {
              props.navigation.navigate('MyFavorites');
            }}
          />
        </View>
      </ScrollView>
      <View>
        <CustomButton title="Sair da conta" onPress={onLogout} />
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
});

export default ProfileMainScreen;
