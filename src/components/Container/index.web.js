import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components/native';

import { themeType } from '@types';

const Wrapper = styled.View`
  background-color: ${p => p.theme.color.primary};
  bottom: 0;
  flex: 1;
  height: 100vh;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const Container = ({ children, theme }) => <Wrapper>{children}</Wrapper>;

Container.propTypes = {
  children: PropTypes.node.isRequired,
  theme: themeType
};

export default withTheme(Container);
