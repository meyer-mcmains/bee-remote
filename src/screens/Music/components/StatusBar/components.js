import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { BlurView } from 'expo-blur';

import { BlackRegular } from '@components/typography';
import IconButton from '@components/IconButton';

const CIRCLE_SIZE = 16;

export const ControlIcon = styled(IconButton).attrs({ size: 30 })``;

// Progress Bar
export const LengthText = styled(BlackRegular)`
  margin-bottom: 2px;
  width: 110px;
`;

export const ProgressWrapper = styled.View`
  height: 100%;
  padding: 8px 0px;
`;

export const DurationWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProgressBarWrapper = styled.View`
  height: 12px;
  flex-direction: row;
  align-items: center;
  margin-right: 26px;
`;

export const ProgressBar = styled.View`
  width: ${p => p.width};
  height: 6;
  border-bottom-width: 1px;
  border-bottom-color: ${p => p.color};
`;

export const Progress = styled(Animated.View)`
  background-color: ${p => p.color || p.theme.color.black};
  z-index: 1;
  left: 0;
  height: 6;
  top: 3;
  width: 20;
  position: absolute;
`;

export const Circle = styled(Animated.View)`
  height: ${CIRCLE_SIZE};
  width: ${CIRCLE_SIZE};
  border-radius: ${CIRCLE_SIZE};
  cursor: pointer;
  z-index: 2;
  position: absolute;
  user-select: none;
  margin-left: -1px;
  background-color: ${p => p.color || p.theme.color.white};
`;

export const Wrapper = styled(BlurView)`
  justify-content: space-between;
  height: 60;
  padding-right: 60px;
  padding-left: 60px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const Image = styled.ImageBackground`
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  border-top-color: ${p => p.color || p.theme.color.white};
  border-top-width: 1px;
  width: 100%;
`;

export const ControlsWrapper = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
`;
