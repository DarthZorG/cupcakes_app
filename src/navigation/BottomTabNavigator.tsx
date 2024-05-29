import React from 'react';
import {Platform, StyleProp, ViewStyle, Animated} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';

import Icon from 'react-native-vector-icons/Ionicons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {RouteProp} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {StoreState} from '../store/reducers';
import {BLACK, GRAY} from '../config/colors';

import AuthStackNavigator from './AuthStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import CartStackNavigator from './CartStackNavigator';
import AdminStackNavigator from './AdminStackNavigator';

type BottomTabParamList = {
  HomeStack: undefined;
  CartStack: undefined;
  AdminStack: undefined;
  ProfileStack: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const getTabBarStyle = (
  route: RouteProp<BottomTabParamList>,
): Animated.WithAnimatedValue<StyleProp<ViewStyle>> => {
  const tabStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {};
  tabStyle.borderTopWidth = 0;
  tabStyle.elevation = 0;
  tabStyle.shadowOffset = {width: 0, height: 0};

  //hiding the tabBar when the AuthStack is visible has been removed from here,
  //as the AuthStackNavigator has now a wrapper that does show and hide the tabBar
  // as needed using useLayoutEffect.

  /* switch  (routeName) {
    case 'Profile':
      tabStyle.display = 'none';
  } */
  return tabStyle;
};

const BottomTabNavigator = (): JSX.Element => {
  const isAuthenticated = useSelector((state: StoreState): boolean => {
    return true; //state.auth.token != null;
  });
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: getTabBarStyle(route),
        headerShown: false,
        tabBarActiveTintColor: BLACK,
        tabBarInactiveTintColor: GRAY,
        tabBarLabelStyle: {
          textTransform: 'uppercase',
          letterSpacing: 3,
        },
      })}>
      <BottomTab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={focused ? BLACK : GRAY}
              size={24}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="CartStack"
        component={CartStackNavigator}
        options={{
          tabBarLabel: 'CARRINHO',
          tabBarIcon: ({focused}) => (
            <Material
              name={focused ? 'food-drumstick' : 'food-drumstick-outline'}
              color={focused ? BLACK : GRAY}
              size={24}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="AdminStack"
        component={AdminStackNavigator}
        options={{
          tabBarLabel: 'ADMIN',
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'cart' : 'cart-outline'}
              color={focused ? BLACK : GRAY}
              size={24}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="ProfileStack"
        component={isAuthenticated ? ProfileStackNavigator : AuthStackNavigator}
        options={{
          tabBarLabel: 'PROFILO',
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'flame' : 'flame-outline'}
              color={focused ? BLACK : GRAY}
              size={24}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
