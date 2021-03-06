import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components/native';

import Header from '../Header';

import { themeType } from '@types';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Wrapper = styled.View`
  background-color: ${p => p.theme.color.primary};
  bottom: 0;
  flex: 1;
  height: 100%;
  left: 0;
  padding-left: 16px;
  padding-right: 16px;
  position: absolute;
  right: 0;
  top: 0;
`;

const Container = ({ children, title, theme }) => (
  <>
    <Header main title={title} />
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
