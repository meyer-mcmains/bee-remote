import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components/native';
import getCurrentRoute from './getCurrentRoute';

import IconButton from '@components/IconButton';

import { navigationType, themeType } from '@types';

const Wrapper = styled.View`
  align-items: center;
  background-color: ${p => p.theme.color.background};
  border-color: ${p => p.theme.color.border};
  border-right-width: 1;
  height: 100%;
  justify-content: space-between;
  padding-bottom: 20;
  padding-top: 20;
  width: 70;
`;

const Sidebar = ({ jumpTo, navigation, theme }) => {
  const selected = getCurrentRoute(navigation.state);
  return (
    <Wrapper>
      <IconButton
        icon="music"
        onPress={() => jumpTo('Music')}
        selected={selected === 'Music'}
        theme={theme}
      />
      <IconButton
        icon="settings"
        onPress={() => jumpTo('Settings')}
        selected={selected === 'SettingsHome'}
        theme={theme}
      />
    </Wrapper>
  );
};

Sidebar.propTypes = {
  jumpTo: PropTypes.func.isRequired,
  navigation: navigationType,
  theme: themeType
};

export default withTheme(Sidebar);
