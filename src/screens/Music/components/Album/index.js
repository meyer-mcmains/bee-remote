import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Artwork from './Artwork';

import { ARTWORK_SIZE } from '../../config';
import { albumType } from '@types';

const Background = styled.View`
  background-color: ${p => p.theme.color.primary};
`;

const Wrapper = styled.TouchableOpacity`
  height: ${p => ARTWORK_SIZE[p.size]}px;
  margin: 20px;
  width: ${p => ARTWORK_SIZE[p.size]}px;
`;

const Album = ({ album, file, setSelected, size }) => (
  <Background>
    <Wrapper onPress={setSelected} size={size}>
      <Artwork file={file} size={size} />
    </Wrapper>
  </Background>
);

Album.propTypes = {
  album: albumType,
  file: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired
};

export default memo(Album);
