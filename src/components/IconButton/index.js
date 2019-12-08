import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import Icon from '@components/Icon';

import { themeType } from '@types';

const TYPES = {
  default: 'default',
  select: 'select'
};

const IconButton = ({
  color,
  icon,
  onPress,
  selected = true,
  style,
  theme,
  type = TYPES.default
}) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Icon
      color={
        type === TYPES.select
          ? selected
            ? theme.color.textDefault
            : theme.color.disabled
          : color
      }
      name={icon}
      size={30}
    />
  </TouchableOpacity>
);

IconButton.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  style: PropTypes.array,
  theme: themeType,
  type: PropTypes.string
};

export default IconButton;
