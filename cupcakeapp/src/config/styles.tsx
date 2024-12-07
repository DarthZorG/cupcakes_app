import React from 'react';
import {BLACK, WHITE} from './colors';

import {Image, Platform, View} from 'react-native';

export const baseHeaderStyle: any = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    textAlign: 'center',
    width: '100%',
  },
  headerBackTitleVisible: false,
  headerTintColor: BLACK,
  headerStyle: {
    backgroundColor: WHITE,
    height: 20,
  },
  title: 'CUPCAKES STORE',
  headerShadowVisible: false,
  headerBackTitleStyle: {
    color: BLACK,
  },
  headerBackVisible: true,

  headerBackImageSource:
    Platform.OS !== 'ios' ? require('../../assets/back-button.png') : undefined,
};
