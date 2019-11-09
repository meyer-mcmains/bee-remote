import React from 'react';
import { BottomTabBar } from 'react-navigation-tabs';
import { withTheme } from 'styled-components/native';

import { themeType } from '@types';

const TabBar = ({ theme, ...props }) => (
  <BottomTabBar
    {...props}
    activeTintColor={theme.color.textDefault}
    inactiveTintColor={theme.color.disabled}
    showIcon
    style={{
      alignItems: 'center',
      backgroundColor: theme.color.primary,
      height: !theme.device.isTablet ? 49 : theme.device.isAndroid ? 56 : 65,
      paddingBottom: !theme.device.isTablet
        ? 7
        : theme.device.isAndroid
          ? 9
          : 15,
      paddingLeft: theme.device.isTablet ? 159 : 0,
      paddingRight: theme.device.isTablet ? 159 : 0,
      paddingTop: 7
    }}
    labelStyle={{
      fontFamily: theme.font.roboto.regular,
      fontSize: 10,
      marginLeft: 0,
      width: 100
    }}
    tabStyle={{
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }}
  />
);

TabBar.propTypes = {
  theme: themeType
};

export default withTheme(TabBar);
