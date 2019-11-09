import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components/native';

import Header from '../Header';

import { themeType } from '@types';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Wrapper = styled.View`
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${p => p.theme.color.primary};
  flex: 1;
  padding-left: 16;
  padding-right: 16;
  left: ${p => (p.theme.device.isWeb ? 70 : 0)};
  position: absolute;
  height: ${p => (p.theme.device.isWeb ? '100vh' : '100%')};
`;

const Container = ({ children, title, theme }) => (
  <>
    {theme.device.isWeb && title && <Header main title={title} />}
    <Wrapper>
      <SafeAreaView>{children}</SafeAreaView>
    </Wrapper>
  </>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  theme: themeType,
  title: PropTypes.string
};

export default withTheme(Container);
