import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import Icon from '@components/Icon';

import { themeType } from '@types';

const IconButton = ({ icon, onPress, selected, theme }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon
      color={selected ? theme.color.textDefault : theme.color.disabled}
      name={icon}
      size={30}
    />
  </TouchableOpacity>
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  theme: themeType
};

export default IconButton;
