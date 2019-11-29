import PropTypes from 'prop-types';

export const navigationType = PropTypes.object.isRequired;

export const themeType = PropTypes.object.isRequired;

export const screenPropsType = PropTypes.shape({
  theme: themeType,
  updateTheme: PropTypes.func.isRequired
}).isRequired;

export const trackType = PropTypes.shape({
  length: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
}).isRequired;

export const artworkType = PropTypes.shape({
  color: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  isDark: PropTypes.bool
}).isRequired;

export const albumType = PropTypes.shape({
  artist: PropTypes.string.isRequired,
  artwork: artworkType,
  title: PropTypes.string.isRequired,
  tracks: PropTypes.arrayOf(trackType),
  year: PropTypes.number
}).isRequired;

export const libraryType = PropTypes.arrayOf(
  PropTypes.shape({
    albums: PropTypes.arrayOf(albumType),
    artist: PropTypes.string.isRequired
  }).isRequired
).isRequired;
