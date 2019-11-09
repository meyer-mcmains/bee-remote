import PropTypes from 'prop-types';

export const navigationType = PropTypes.object.isRequired;

export const themeType = PropTypes.object.isRequired;

export const settingsScreenProps = PropTypes.shape({
  theme: themeType,
  updateTheme: PropTypes.func.isRequired
}).isRequired;
