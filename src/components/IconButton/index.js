import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import Icon from '@components/Icon';

import { themeType, styleType } from '@types';

const TYPES = {
  default: 'default',
  select: 'select'
};

const IconButton = ({
  color,
  icon,
  onPress,
  selected = true,
  size = 30,
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
      size={size}
    />
  </TouchableOpacity>
);

IconButton.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  size: PropTypes.number,
  style: styleType,
  theme: themeType,
  type: PropTypes.string
};

export default IconButton;
