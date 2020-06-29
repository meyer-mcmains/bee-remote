import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Svg, { Defs, LinearGradient, Mask, Rect, Text } from 'react-native-svg';

import { BodyRegular } from '@components/typography';
import { trackType } from '@types';

const Number = styled(BodyRegular)`
  width: 30;
  margin-left: 10;
`;

const TRACK_HEIGHT = 25;
const TRACK_MARGIN = 1;
export const ITEM_HEIGHT = TRACK_HEIGHT + 1 + TRACK_MARGIN * 2;

const NameLengthContainer = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  margin-right: 10;
`;

export const TrackWrapper = styled.View`
  flex-wrap: wrap;
  flex: 1 0 auto;
  margin-top: ${p => (p.marginTop ? ITEM_HEIGHT : 0)};
  max-height: ${p => p.height};
`;

const Wrapper = styled.TouchableOpacity`
  align-items: center;
  background-color: ${p => (p.selected ? 'transparent' : 'rgba(0, 0, 0, 0.2)')};
  border: ${p =>
    p.selected ? 'none' : '0.5px solid rgba(255, 255, 255, 0.1)'};
  flex-direction: row;
  height: ${TRACK_HEIGHT};
  margin: ${TRACK_MARGIN}px;
  width: 50%;
`;

const Track = ({
  color,
  length,
  name,
  number,
  onPress,
  selected,
  ...props
}) => (
  <Wrapper onPress={() => onPress(props.trackID)} selected={selected}>
    {selected ? (
      <Svg width="100%" height="100%" style={{ height: '100%', width: '100%' }}>
        <Rect
          width="100%"
          height="100%"
          fill={color._value}
          x="0"
          y="0"
          fillOpacity={selected ? 1 : 0.2}
          mask={`url(#knockout${number})`}
        />
        <Mask id={`knockout${number}`}>
          <Rect width="100%" height="100%" fill="#fff" x="0" y="0" />
          <Text
            x="1.8%"
            y="55%"
            fill="#000"
            textAnchor="start"
            alignmentBaseline="middle"
            fontFamily="roboto"
            fontWeight="bold"
          >
            {number}
          </Text>
          <Svg x="7%" width="78%">
            <Defs>
              <LinearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0.5" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity=".5" />
              </LinearGradient>
            </Defs>
            <Text
              width="100%"
              y="55%"
              fill="black"
              alignmentBaseline="middle"
              fontFamily="roboto"
              fontWeight="bold"
            >
              {name}
            </Text>
            <Rect fill="url(#fade)" y="0" x="90%" width="10%" />
          </Svg>
          <Text
            x="98.5%"
            y="55%"
            fill="#000"
            textAnchor="end"
            alignmentBaseline="middle"
            fontFamily="roboto"
            fontWeight="bold"
          >
            {length}
          </Text>
        </Mask>
      </Svg>
    ) : (
      <>
        <Number color="white">{number}</Number>
        <NameLengthContainer>
          <BodyRegular color="white" numberOfLines={1}>
            {name}
          </BodyRegular>
          <BodyRegular color="white">{length}</BodyRegular>
        </NameLengthContainer>
      </>
    )}
  </Wrapper>
);

Track.propTypes = {
  onPress: PropTypes.func.isRequired,
  ...trackType
};

export default memo(Track);
