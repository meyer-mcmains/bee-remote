import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Easing } from 'react-native';
import { Spring, animated } from 'react-spring/renderprops';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop
} from 'react-native-svg';
import { BlurView } from 'expo-blur';

import { themeType } from '@types';

const WIDTH = 4;

const AnimatedCircle = animated(Circle);
const AnimatedPath = animated(Path);

const fromValues = {
  x: 0
};

const toValues = {
  x: 1000
};

const Wrapper = styled(BlurView).attrs({
  intensity: 80,
  tint: 'dark'
})`
  align-items: center;
  justify-content: center;
  height: ${p => (p.theme.device.isWeb ? '100vh' : '100%')};
  width: 100%;
  background-color: transparent;
  position: absolute;
  right: 0;
  z-index: 1;
`;

const Logo = ({ theme }) => {
  const [isForward, setIsForward] = useState(true);
  return (
    <Wrapper>
      <Spring
        native
        config={{
          easing: Easing.inOut,
          friction: 100,
          tension: 300
        }}
        onRest={() => setIsForward(isForward => !isForward)}
        from={isForward ? toValues : fromValues}
        to={isForward ? fromValues : toValues}
      >
        {({ x }) => (
          <Svg version="1.1" width={311} height={258} viewBox="0 0 320 260">
            <Defs>
              <LinearGradient id="gradient" x1="0%" y1="100%">
                <Stop offset="0%" stopColor={theme.color.textDefault} />
                <Stop offset="100%" stopColor={theme.color.title} />
              </LinearGradient>
            </Defs>
            <G
              fill="transparent"
              stroke="url(#gradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={WIDTH}
            >
              <AnimatedPath
                strokeDasharray={[878]}
                strokeDashoffset={x.interpolate([1, 0], [0, 1.76])}
                d="M248,25.1c-9.9-8.7-21.8-12.4-34.8-14.4c-4.2-0.6-11.2-0.6-11.2-0.6c-16-6-26-6.8-31.2-7.1c-24.2-1.3-45.4,6.8-64.2,21.1C55.9,30.7,15.1,67.9,4.7,116.8c-10.6,50.2,12,100.1,57.2,127c37.7,22.6,103.4,25.5,148.9-25.8c10.6,4.1,21.3,8.2,32.4,12.4L220.6,204c17.6-28.8,21.7-61.6,14.4-92.9c11-7,15.9-11.5,21-19C271,70.1,267.9,42.7,248,25.1z"
              />
              <AnimatedPath
                strokeDasharray={[272]}
                strokeDashoffset={x.interpolate([1, -1], [0, 1.09])}
                d="M176.1,150.2c-1.6,22.2-6.7,43.4-18,62.8c-4.5,7.8-9.9,15-17.2,20.4c-1.6,1.2-3.3,2.2-5.4,3.1c6.7-18.9,12.1-37.9,14.9-57.6c2.8-19.5,1.8-41.8,0.6-61.8c10,4,16,6,26,7C177,131.8,176.7,142.1,176.1,150.2z"
              />
              <AnimatedPath
                strokeDasharray={[230]}
                strokeDashoffset={x.interpolate([1, -1], [0, 0.92])}
                d="M205,191.3c-8.9,15-21,27.6-27.5,28.2c15.4-32.5,19.6-57.1,19.5-95.4c6.5-0.5,12.1-1.8,19-4C218.5,144.5,218,169.5,205,191.3z"
              />
              <AnimatedPath
                strokeDasharray={[270]}
                strokeDashoffset={x.interpolate([1, -1], [0, 1.08])}
                d="M237.9,78.6c-8.3,12.3-20.3,19.3-34.4,23c-13.2,3.6-26.4,3.6-39.3-1.4c-1.9-0.8-3.8-1.6-5.6-2.6c-15.8-8.9-19.9-25.2-9.8-40.3c8.8-13.3,22-20.2,37.1-23.8c4.7-1.1,9.6-1.4,12.1-1.8c12.6,0,22.3,1.7,31.1,7.1C244.2,48,247.8,63.9,237.9,78.6z"
              />
              <AnimatedCircle
                strokeDasharray={[166]}
                strokeDashoffset={x.interpolate([0.2, -0.1], [0, 0.1])}
                cx="55.5"
                cy="148.6"
                r="26.5"
              />
              <AnimatedCircle
                strokeDasharray={[314]}
                strokeDashoffset={x.interpolate([0.2, -0.2], [0, 0.251])}
                cx="67.5"
                cy="141.1"
                r="50"
              />
              <AnimatedPath
                strokeDasharray={[298]}
                strokeDashoffset={x.interpolate([0.2, -0.2], [0, 0.24])}
                d="M307.8,215.2c8.1,11.5,3.2,22.1-5.5,28.2c-5.9,4.1-12.5,6-19.7,5.4c-12.4-1.1-17.5-11.6-10.6-21.8c3.8-5.8,9.2-9.1,15.7-11.3c1.9-0.6,2.7-2.8,1.7-4.5c-0.2-0.3-0.3-0.5-0.5-0.8c-10.3-15.7-20.5-31.5-30.9-47.2c-1.9-3-3.7-5.8-1.3-9.3c2.3-3.4,5.6-3.1,9.1-2.3c7.5,1.7,15.1,3.2,22.6,4.8c1.4,0.3,2.6,0.7,3.7,1.2c3.2,1.7,4.2,5.9,2.4,9c-1.8,3.1-4.1,3.6-8.7,2.6c-2.4-0.5-4.8-0.9-7.2-1.4c-2-0.3,0.3,0.1-1.9-0.3L307.8,215.2z"
              />
            </G>
          </Svg>
        )}
      </Spring>
    </Wrapper>
  );
};

Logo.propTypes = {
  theme: themeType
};

export default Logo;
