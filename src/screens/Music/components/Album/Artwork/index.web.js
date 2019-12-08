import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ARTWORK_SIZE } from '../../../config';

const Image = styled.img.attrs({ draggable: false })`
  display: none;
  height: ${p => ARTWORK_SIZE[p.size]}px;
  user-select: none;
  width: ${p => ARTWORK_SIZE[p.size]}px;
  z-index: 1;
`;

const Artwork = ({ file, size, style }) => {
  const hideOnError = ({ target }) => (target.style.display = 'none');
  const showOnLoad = ({ target }) => (target.style.display = 'block');
  return (
    <Image
      src={file}
      onError={hideOnError}
      onLoad={showOnLoad}
      size={size}
      style={style}
    />
  );
};

Artwork.propTypes = {
  file: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default memo(Artwork);
