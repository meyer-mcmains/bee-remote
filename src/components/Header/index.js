import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { Title } from '@components/typography';

const Wrapper = styled.View`
  width: 100%;
  height: 52;
  flex-direction: row;
  top: 14;
  left: ${p => (p.main ? 86 : 0)};
  z-index: 1;
`;

const Header = ({ title, main = false }) => {
  return (
    <Wrapper main={main}>
      <Title>{title}</Title>
    </Wrapper>
  );
};

Header.propTypes = {
  main: PropTypes.bool,
  title: PropTypes.string.isRequired
};

export default Header;
