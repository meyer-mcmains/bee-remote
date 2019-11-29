import styled, { css } from 'styled-components/native';
import { BlurView } from 'expo-blur';

import { BlackRegular, BlackSmall } from '@components/typography';
import { ITEM_HEIGHT } from './Track';

const ANGLE_HEIGHT = 20;

export const Blur = styled(BlurView)`
  flex-direction: row;
  padding: 25px;
  padding-top: ${ANGLE_HEIGHT + 25};
`;

export const DiskName = styled(BlackRegular)`
  color: ${p => p.color || p.theme.color.textDefault};
  font-size: 12;
  margin-bottom: -3;
  margin-left: -4;
  margin-top: 15;
  text-shadow: 0.5px 0.5px 0.5px black;
`;

export const AngleStyle = css`
  border-top-color: ${p => p.theme.color.primary};
  border-top-width: ${ANGLE_HEIGHT};
  width: ${p => p.width};
`;

export const LeftAngle = styled.View`
  ${AngleStyle};
  border-right-color: transparent;
  border-right-width: ${ANGLE_HEIGHT};
`;

export const RightAngle = styled.View`
  ${AngleStyle};
  border-left-color: transparent;
  border-left-width: ${ANGLE_HEIGHT};
`;

export const InfoWrapper = styled.View`
  flex-basis: 200;
  flex: 1;
  margin-left: 25;
  margin-right: 20;
  max-width: 100%;
  min-height: 200;
  z-index: 2;
`;

export const AngleWrapper = styled.View`
  flex-direction: row;
  height: ${ANGLE_HEIGHT * 2};
  justify-content: space-between;
  position: absolute;
  z-index: 1;
`;

export const Title = styled(BlackRegular)`
  color: ${p => p.color || p.theme.color.textDefault};
  font-size: 24;
  text-shadow: 0.5px 0.5px 0.5px black;
`;

export const TrackWrapper = styled.View`
  flex-wrap: wrap;
  flex: 1 0 auto;
  margin-top: ${p => (p.marginTop ? ITEM_HEIGHT : 0)};
  max-height: ${p => p.height};
`;

export const Year = styled(BlackSmall)`
  color: ${p => p.color || p.theme.color.textDefault};
  font-size: 17;
  margin-bottom: 5;
  margin-left: 5;
  text-shadow: 0.5px 0.5px 0.5px black;
`;
