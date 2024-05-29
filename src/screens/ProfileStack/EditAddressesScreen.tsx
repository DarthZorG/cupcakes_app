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
import {BoldText} from '../../components/StyledTexts';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'EditAddress'>;

function EditAddressScreen(props: PropsType): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Editar Endereço" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <FormField title="CEP" value="80000-000" />
          <FormField title="Rua" value="Rua Antonio de Paula, 400 " />
          <FormField title="Complemento" value="" />
          <FormField title="Bairro" value="Hauer" />
          <FormField title="Cidade" value="Curitba" />
        </View>
      </ScrollView>
      <View>
        <CustomButton title="Salvar" onPress={() => {}} />
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

export default EditAddressScreen;
