/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BLUE, GRAY, LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import {BoldText} from '../../components/StyledTexts';
import {AdminStackParamList} from '../../navigation/AdminStackNavigator';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';

type PropsType = NativeStackScreenProps<AdminStackParamList, 'EditProduct'>;

function EditProductScreen(props: PropsType): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Editar Produto" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <FormField title="Nome produto" value="Floresta negra" />
          <FormField title="Sabor" value="Chocolate com cereja" />
          <FormField title="Preço (R$)" value="4,50" />
          <View style={[styles.switchContainer]}>
            <BoldText>Sem açucar?</BoldText>
            <Switch
              style={styles.switchStyle}
              trackColor={{true: BLUE, false: GRAY}}
              thumbColor={Platform.OS === 'ios' ? WHITE : WHITE}
              value={true}
            />
          </View>
          <View style={[styles.switchContainer]}>
            <BoldText>Sem lactose?</BoldText>
            <Switch
              style={styles.switchStyle}
              trackColor={{true: BLUE, false: GRAY}}
              thumbColor={Platform.OS === 'ios' ? WHITE : WHITE}
              value={true}
            />
          </View>
          <View style={[styles.switchContainer]}>
            <BoldText>Sem gluten?</BoldText>
            <Switch
              style={styles.switchStyle}
              trackColor={{true: BLUE, false: GRAY}}
              thumbColor={Platform.OS === 'ios' ? WHITE : WHITE}
              value={false}
            />
          </View>
          <View style={[styles.photoContainer]}>
            <BoldText>Foto</BoldText>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/images/cupcake.jpg')}
                style={styles.image}
              />
            </View>
          </View>
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
  switchContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  photoContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  switchStyle: {},
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default EditProductScreen;
