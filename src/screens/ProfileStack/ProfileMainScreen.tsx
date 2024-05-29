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
import { WHITE } from '../../config/colors';
import MenuItem from '../../components/MenuItem';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

function ProfileMainScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.pageHeader}></View>
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollview}>
      <View style={styles.innerContainer}>
        <MenuItem title='Meus dados' />
        <MenuItem title='Meus endereços' />
        <MenuItem title='Meus pedidos' />
        <MenuItem title='Sair da conta' />
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
    height: 100,
  },
});


export default ProfileMainScreen;
