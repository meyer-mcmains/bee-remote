import React from 'react';
import styled from 'styled-components/native';

import { BodyRegular } from '@components/typography';
import { trackType } from '@types';

export const Name = styled(BodyRegular).attrs({ numberOfLines: 1 })`
  margin-right: 30;
  overflow: hidden;
`;

const Number = styled(BodyRegular)`
  width: 30;
`;

const TRACK_HEIGHT = 25;
const TRACK_MARGIN = 1;
export const ITEM_HEIGHT = TRACK_HEIGHT + 1 + TRACK_MARGIN * 2;

const NameLengthContainer = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

export const TrackWrapper = styled.View`
  flex-wrap: wrap;
  flex: 1 0 auto;
  margin-top: ${p => (p.marginTop ? ITEM_HEIGHT : 0)};
  max-height: ${p => p.height};
`;

const Wrapper = styled.View`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5;
  border: 0.5px solid rgba(255, 255, 255, 0.1);
  flex-direction: row;
  height: ${TRACK_HEIGHT};
  margin: ${TRACK_MARGIN}px;
  padding-left: 10;
  padding-right: 10;
  width: 50%;
`;

const Track = ({ length, name, number }) => (
  <Wrapper>
    <Number color="white">{number}</Number>
    <NameLengthContainer>
      <Name color="white">{name}</Name>
      <BodyRegular color="white">{length}</BodyRegular>
    </NameLengthContainer>
  </Wrapper>
);

Track.propTypes = trackType;

export default Track;
