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
import {BoldText} from '../../components/StyledTexts';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';
import FormLabel from '../../components/FormLabel';
import {useDispatch} from 'react-redux';
import {IUser} from '../../models/User';
import {startLoading, stopLoading} from '../../store/actions/LoaderActions';
import UserService from '../../services/UsersService';
import ErrorHelper from '../../Errors/ErrorHelper';

type PropsType = NativeStackScreenProps<ProfileStackParamList, 'MyProfile'>;

function MyProfileScreen(props: PropsType): JSX.Element {
  const dispatch = useDispatch();
  const [user, setUser] = useState<IUser>({
    id: '',
    userName: '',
    lastName: '',
    firstName: '',
    email: '',
  });

  const loadUser = async (): Promise<void> => {
    try {
      dispatch(startLoading());
      const data = await UserService.getCurrentUser();
      setUser(data);
      dispatch(stopLoading());
    } catch (e: any) {
      ErrorHelper.handleError(e, dispatch);
    }
  };

  useEffect(() => {
    loadUser().catch(() => {});
  }, []);

  const saveUser = async (): Promise<void> => {
    try {
      dispatch(startLoading());
      await UserService.updateUser(user.id, user);
      dispatch(stopLoading());
      props.navigation.navigate('ProfileHome');
    } catch (e: any) {
      ErrorHelper.handleError(e, dispatch);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="O Meu Perfil" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}>
        <View style={styles.innerContainer}>
          <FormLabel title="E-mail" value={user.email} />
          <FormField
            title="Nome"
            value={user.firstName}
            onChange={text => {
              setUser({...user, firstName: text});
            }}
          />
          <FormField
            title="Sobrenome"
            value={user.lastName}
            onChange={text => {
              setUser({...user, lastName: text});
            }}
          />
          <FormField
            title="Telefone"
            value={user.phoneNumber ?? ''}
            onChange={text => {
              setUser({...user, phoneNumber: text});
            }}
          />
        </View>
      </ScrollView>
      <View>
        <CustomButton
          title="Salvar"
          onPress={() => {
            saveUser();
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

export default MyProfileScreen;
