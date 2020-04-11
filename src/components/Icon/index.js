import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

const FeatherIcon = styled(Feather)`
  color: ${p => p.theme.color[p.color] || p.color};
  user-select: none;
`;

const Icon = ({ color = 'textDefault', name, size = 20 }) => (
  <FeatherIcon name={name} size={size} color={color} />
);

Icon.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.number
};

export default Icon;
