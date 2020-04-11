import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext
} from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, PanResponder } from 'react-native';
import { connect } from 'react-redux';
import MusicBeeContext from '@mbApi/context';
import { appData } from '@utils/filesystem';

import { BlackRegular } from '@components/typography';
import {
  Circle,
  ControlsWrapper,
  Progress,
  ProgressBar,
  ProgressBarWrapper,
  Wrapper,
  DurationWrapper,
  ProgressWrapper,
  LengthText,
  Image,
  ControlIcon
} from './components';

import { actions } from '@modules/player';

function toMs(m, s) {
  return m * 60000 + s * 1000;
}

function fromSeconds(seconds = 0, duration) {
  const defaultSeconds = duration.length === 5 ? '00' : '0';
  const MM = seconds >= 60 ? Math.floor(seconds / 60) : defaultSeconds;
  const SS = seconds % 60;
  return `${MM}:${SS >= 10 ? '' : 0}${SS || 0}`;
}

const StatusBar = ({
  artist,
  color,
  duration = '00:00',
  file,
  playPause,
  name
}) => {
  const [progress] = useState(new Animated.ValueXY());
  const [time, setTime] = useState(0);
  const [watchTime, setWatchTime] = useState(0);
  const [secPerPixelWidth, setSecPerPixelWidth] = useState(0);
  const width = useRef(0);
  const [secPerPixel, setSecPerPixel] = useState();
  const [isPressed, setIsPressed] = useState(false);
  const testValue = useRef({ x: 0, y: 0 });

  const { isPlaying } = useContext(MusicBeeContext);

  function restrictX({ x }) {
    if (Math.sign(x) === -1) {
      return 0;
    } else if (x > width.current) {
      return width.current;
    }
    return x;
  }

  const responderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        progress.setOffset({
          x: restrictX(testValue.current),
          y: testValue.current.y
        });
        progress.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: progress.x, dy: progress.y }
      ]),
      onPanResponderRelease: ({ nativeEvent }, gestureState) => {
        setIsPressed(false);
        progress.flattenOffset();
      }
    })
  );

  progress.addListener(value => {
    if (Math.sign(value.x) === -1) {
      setWatchTime(0);
    } else if (value.x > width.current) {
      setWatchTime(time / 1000);
    } else {
      setWatchTime(Math.floor(value.x / secPerPixel));
    }
    testValue.current = value;
  });

  const progressAnimation = useCallback(
    () =>
      Animated.timing(progress.x, {
        duration: time,
        easing: Easing.in(Easing.linear),
        toValue: width.current,
        useNativeDriver: true
      }),
    [progress, time, width]
  );

  function getWidth({ nativeEvent: { layout } }) {
    // TODO: make this calc more dynamic
    const calc = layout.width * 0.7;
    width.current = calc;
    setSecPerPixelWidth(calc);
  }

  useEffect(() => {
    isPlaying ? progressAnimation().start() : progressAnimation().stop();
  }, [isPlaying, progressAnimation]);

  useEffect(() => {
    const minSec = duration.split(':');
    const ms =
      minSec.length > 1
        ? toMs(parseInt(minSec[0]), parseInt(minSec[1]))
        : toMs(parseInt(minSec[0]), 0);
    setTime(ms);
    setSecPerPixel(secPerPixelWidth / (ms / 1000));
    progress.setValue({ x: 0, y: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, secPerPixelWidth]);

  const progressX = progress.x.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, width.current],
    outputRange: [0, width.current]
  });

  return (
    <Image source={{ uri: file }} resizeMode="stretch" color={color}>
      <Wrapper onLayout={getWidth} intensity={file ? 300 : 40}>
        <ControlsWrapper>
          <ControlIcon
            color={color}
            icon="skip-back"
            onPress={() => console.log('add skip back')}
            style={{ marginRight: 20 }}
          />
          <ControlIcon
            color={color}
            icon={isPlaying ? 'pause' : 'play'}
            onPress={playPause}
          />
          <ControlIcon
            color={color}
            icon="skip-forward"
            onPress={() => console.log('add skip forward')}
            style={{ marginLeft: 20 }}
          />
        </ControlsWrapper>
        <ProgressWrapper>
          <BlackRegular color={color}>
            {artist && name ? `${artist}  ‣  ${name}` : <>&nbsp;</>}
          </BlackRegular>
          <DurationWrapper>
            <ProgressBarWrapper style={{ width: width.current }}>
              <ProgressBar width={width.current} color={color} />
              {duration !== '00:00' && (
                <Circle
                  color={color}
                  style={{ transform: [{ translateX: progressX }] }}
                  isPressed={isPressed}
                  {...(responderRef.current &&
                    responderRef.current.panHandlers)}
                />
              )}
              <Progress color={color} style={{ width: progressX }} />
            </ProgressBarWrapper>

            <LengthText color={color}>{`${fromSeconds(
              watchTime,
              duration
            )} / ${duration}`}</LengthText>
          </DurationWrapper>
        </ProgressWrapper>
      </Wrapper>
    </Image>
  );
};

StatusBar.propTypes = {
  artist: PropTypes.string,
  color: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  file: PropTypes.string,
  name: PropTypes.string,
  playPause: PropTypes.func.isRequired
};

const mapStateToProps = ({ player: { nowPlaying } }) => ({
  album: nowPlaying.album,
  artist: nowPlaying.albumArtist,
  color: nowPlaying.artwork.color,
  duration: nowPlaying.length,
  file: nowPlaying.artwork.file
    ? `file://${appData}album-art/${nowPlaying.artwork.file}`
    : null,
  name: nowPlaying.name
});

export default connect(mapStateToProps, {
  playPause: actions.playPause
})(memo(StatusBar));
