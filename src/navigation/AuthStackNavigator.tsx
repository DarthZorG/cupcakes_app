// @ts-ignore
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/AuthStack/LoginScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationProp} from '@react-navigation/native';
import {baseHeaderStyle} from '../config/styles';
import {Platform, TouchableOpacity, Image, View} from 'react-native';

//allowed parameters for each stack screen
export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  Register: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

// eslint-disable-next-line no-undef
export const AuthStackNavigator = (): JSX.Element => {
  const getIosFix = (navigation: any): any => {
    if (Platform.OS === 'ios') {
      return {
        headerLeft: () => (
          <View style={{height: baseHeaderStyle.headerStyle.height * 2.1}}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={require('../../assets/back-button.png')}
                style={{
                  height: '100%',
                  aspectRatio: 0.24447,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        ),
        headerBackVisible: false,
      };
    }
    return null;
  };

  return (
    <AuthStack.Navigator
      screenOptions={({navigation}) => {
        return {
          ...baseHeaderStyle,
          ...getIosFix(navigation),
        };
      }}>
      <AuthStack.Screen
        name={'Login'}
        component={LoginScreen}
        options={
          {
            // headerShown: false,
          }
        }
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
