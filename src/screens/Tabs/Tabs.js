import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import WalletScreen from './WalletScreen';
import {Provider} from 'react-redux';
import {store} from 'OneriverApp/src/config/store';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Provider store={store}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({}) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#1A4184',
            height: 56,
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => {
              var icon = focused
                ? require('OneriverApp/src/images/tabs/home_icon_focused.png')
                : require('OneriverApp/src/images/tabs/home_icon_unfocused.png');
              return <Image source={icon} style={{width: 37.5, height: 32}} />;
            },
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => {
              var icon = focused
                ? require('OneriverApp/src/images/tabs/wallet_icon_focused.png')
                : require('OneriverApp/src/images/tabs/wallet_icon_unfocused.png');
              return <Image source={icon} style={{width: 28, height: 32}} />;
            },
          }}
        />
      </Tab.Navigator>
    </Provider>
  );
};

export default Tabs;
