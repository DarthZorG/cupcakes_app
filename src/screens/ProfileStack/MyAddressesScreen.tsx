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
import {ProfileStackParamList} from '../../navigation/ProfileStackNavigator';
import {BLACK, LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import {BoldText} from '../../components/StyledTexts';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'MyAddresses'>;

function MyAddressesScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
      <View style={styles.pageHeader}>
        <BoldText>{'Endereços'}</BoldText>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <MenuItem
            title="Rua antonio de Padua, 400"
            description="80010-000 Centro Civico, Curitiba PR"
            onPress={() => {
              props.navigation.navigate('EditAddress');
            }}></MenuItem>
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
    height: 60,
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyAddressesScreen;
