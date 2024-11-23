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
import {ProfileStackParamList} from '../../navigation/ProfileStackNavigator';
import {LIGHT_BLUE, WHITE} from '../../config/colors';
import MenuItem from '../../components/MenuItem';
import {BoldText} from '../../components/StyledTexts';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';
import FormLabel from '../../components/FormLabel';
import {CreateUserRequest} from '../../models/CreateUserRequest';
import {useDispatch} from 'react-redux';
import {showAlert} from '../../store/actions/AlertActions';
import UserService from '../../services/UsersService';
import ErrorHelper from '../../Errors/ErrorHelper';
import {startLoading, stopLoading} from '../../store/actions/LoaderActions';
import AuthService from '../../services/AuthService';
import {login} from '../../store/actions/AuthActions';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'MyProfile'>;

function RegisterScreen(props: PropsType): JSX.Element {
  const [data, setData] = useState<CreateUserRequest>({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
  });
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const dispatch = useDispatch();

  const createAccount = async () => {
    if (passwordConfirm !== data.password) {
      dispatch(
        showAlert('Erro', 'As senhas não coincidem', [
          {
            text: 'Ok',
            onPress: () => {},
            isCancelButton: true,
          },
        ]),
      );
      return;
    }
    try {
      dispatch(startLoading());
      const result = await UserService.addUser(data);
      if (result != null) {
        const loginToken = await AuthService.login(data.email, data.password);
        dispatch(stopLoading());
        dispatch(login(loginToken));
      }
    } catch (e: any) {
      ErrorHelper.handleError(e, dispatch);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Criar nova conta" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <FormField
            title="E-mail"
            value={data.email}
            onChange={value => {
              setData({...data, email: value});
            }}
          />
          <FormField
            title="Password"
            isPassword={true}
            value={data.password}
            onChange={value => {
              setData({...data, password: value});
            }}
          />
          <FormField
            title="Conferma Password"
            isPassword={true}
            value={passwordConfirm}
            onChange={value => {
              setPasswordConfirm(value);
            }}
          />
          <FormField
            title="Nome"
            value={data.firstName}
            onChange={value => {
              setData({...data, firstName: value});
            }}
          />
          <FormField
            title="Sobrenome"
            value={data.lastName}
            onChange={value => {
              setData({...data, lastName: value});
            }}
          />
          <FormField
            title="Telefone"
            value={data.phoneNumber ?? ''}
            onChange={value => {
              setData({...data, phoneNumber: value});
            }}
          />
        </View>
      </ScrollView>
      <View>
        <CustomButton title="Criar a minha conta!" onPress={createAccount} />
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

export default RegisterScreen;
