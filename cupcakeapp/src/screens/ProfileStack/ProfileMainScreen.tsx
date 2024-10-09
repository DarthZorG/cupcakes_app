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
import {ProfileStackParamList} from '../../navigation/ProfileStackNavigator';
import {LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import CustomButton from '../../components/CustomButton';
import {BoldText} from '../../components/StyledTexts';
import PageHeader from '../../components/PageHeader';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

function ProfileMainScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
        <CustomButton
          title="Sair da conta"
          onPress={() => {
            props.navigation.navigate('Login');
          }}
        />
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
