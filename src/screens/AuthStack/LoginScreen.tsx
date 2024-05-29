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
import {AuthStackParamList} from '../../navigation/AuthStackNavigator';
import CustomButton from '../../components/CustomButton';
import FormLabel from '../../components/FormLabel';
import {WHITE} from '../../config/colors';
import FormField from '../../components/FormField';

type PropsType = NativeStackScreenProps<AuthStackParamList, 'Login'>;

function LoginScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex:1,
    
  };

  return (
    <SafeAreaView style={backgroundStyle}>

      <View style={styles.innerContainer}>
        <FormField title="E-mail" value="" />
        <FormField title="Password" value="" />
        <CustomButton
          title="Esqueceu a senha ?"
          onPress={() => {}}
          textStyle={{fontSize: 12}}
        />
        <CustomButton
          title="Não tem conta ?"
          onPress={() => {
            props.navigation.navigate('Register');
          }}
          textStyle={{fontSize: 12}}
        />
      </View>
      <View>
        <CustomButton title="LOGIN" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: WHITE,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 30,
    
  },
});

export default LoginScreen;
