import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SideBar from './SideBar';
import Icon from '@components/Icon';
import TabBar from './TabBar';

import Music from '@screens/Music';
import Settings from '@screens/Settings';

const Navigator = createBottomTabNavigator(
  {
    Music: {
      navigationOptions: {
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ tintColor }) => <Icon color={tintColor} name="music" />
      },
      screen: Music
    },
    Settings: {
      navigationOptions: {
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} name="settings" />
        ),
        title: 'Settings'
      },
      screen: Settings
    }
  },
  {
    initialRouteName: 'Music',
    tabBarComponent: Platform.OS === 'web' ? SideBar : TabBar
  }
);

export default createAppContainer(Navigator);
