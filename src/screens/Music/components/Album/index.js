import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import Artwork from './Artwork';

import { useDoublePress } from '@hooks';

import { actions } from '@modules/player';
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

const Album = ({ album, file, playAlbum, setSelected, size }) => {
  const onPress = useDoublePress(setSelected, () => playAlbum(album), true);

  return (
    <Background>
      <Wrapper onPress={onPress} size={size}>
        <Artwork file={file} size={size} />
      </Wrapper>
    </Background>
  );
};

Album.propTypes = {
  album: albumType,
  file: PropTypes.string.isRequired,
  playAlbum: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired
};

export default connect(null, { playAlbum: actions.playAlbum })(memo(Album));
