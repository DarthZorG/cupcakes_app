/**
 * (C) 2024 Mauro Minoro
 *
 * @format
 */

import React, {useState} from 'react';
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
import PageHeader from '../../components/PageHeader';
import AuthService from '../../services/AuthService';
import {APIError} from '../../Errors/APIError';
import {useDispatch} from 'react-redux';
import {showAlert} from '../../store/actions/AlertActions';
import {login} from '../../store/actions/AuthActions';
import {startLoading, stopLoading} from '../../store/actions/LoaderActions';

type PropsType = NativeStackScreenProps<AuthStackParamList, 'Login'>;

function LoginScreen(props: PropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const onLogin = async (): Promise<void> => {
    try {
      dispatch(startLoading());
      const loginToken = await AuthService.login(email, password);

      dispatch(stopLoading());
      dispatch(login(loginToken));
    } catch (e: any) {
      dispatch(stopLoading());
      console.log(e);
      if (e instanceof APIError) {
        e.showAlert(dispatch);
      } else {
        dispatch(showAlert('Error', e.message));
      }
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.innerContainer}>
        <PageHeader title="Entre na sua conta" />
        <FormField
          title="E-mail"
          value={email}
          onChange={text => setEmail(text)}
        />
        <FormField
          title="Password"
          value={password}
          isPassword={true}
          onChange={text => setPassword(text)}
        />
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
        <CustomButton title="LOGIN" onPress={onLogin} />
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
