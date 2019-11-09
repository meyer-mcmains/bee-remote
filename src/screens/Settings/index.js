import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Title } from '@components/typography';

import SettingsHome from './SettingsHome';

const SettingsStack = createStackNavigator(
  {
    SettingsHome
  },
  {
    defaultNavigationOptions: ({ screenProps }) => ({
      headerStyle: {
        backgroundColor: screenProps.theme.color.primary,
        borderBottomWidth: 0,
        height: 50,
        marginLeft: 16
      },
      headerTitle: <Title>Settings</Title>
    }),
    headerLayoutPreset: 'left',
    initialRouteName: 'SettingsHome'
  }
);

const SettingsSwitch = createSwitchNavigator(
  { SettingsHome },
  { initialRouteName: 'SettingsHome' }
);

export default Platform.OS === 'web' ? SettingsSwitch : SettingsStack;
