import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View } from 'react-native';

import {
  AngleWrapper,
  Blur,
  DiskName,
  InfoWrapper,
  LeftAngle,
  RightAngle,
  Title,
  TrackWrapper,
  Year
} from './components';

import ColorSelect from '../ColorSelect';

import Track, { ITEM_HEIGHT } from './Track';

// TODO make HEIGHT dynamic
const HEIGHT = 152;

const diskFilter = i => ({ disk }) => (disk ? disk === i + 1 : true);

const determineHeight = numTracks => {
  if (numTracks * ITEM_HEIGHT > HEIGHT) {
    if ((numTracks * ITEM_HEIGHT) / 2 < HEIGHT) {
      return HEIGHT;
    } else {
      return (numTracks * ITEM_HEIGHT) / 2;
    }
  }
  return HEIGHT;
};

const Expanded = ({ album, color, file, leftSlashWidth, rightSlashWidth }) => {
  const { artist, artwork, title, tracks, year } = album;

  const [numDisks, setNumDisks] = useState(1);
  const [heights, setHeights] = useState(HEIGHT);
  const [selectedTrack, setSelectedTrack] = useState({});

  function selectTrack(trackID) {
    return () => setSelectedTrack(trackID);
  }

  useLayoutEffect(() => {
    // get the number of disks
    const disks = Math.max(...tracks.map(track => track.disk));
    setNumDisks(disks > 0 ? disks : 1);

    // determine how much height each disk needs
    if (numDisks === 1) {
      const tracksLength = tracks.length + 1;
      setHeights([determineHeight(tracksLength)]);
    } else {
      setHeights([]);
      Array.from({ length: numDisks }, (_, i) => {
        const numTracks = tracks.filter(diskFilter(i)).length + 1;
        setHeights(heights => [...heights, determineHeight(numTracks)]);
      });
    }
  }, [numDisks, tracks]);

  return (
    <ImageBackground source={{ uri: file }} resizeMode="stretch">
      <AngleWrapper>
        <LeftAngle width={leftSlashWidth} />
        <RightAngle width={rightSlashWidth} />
      </AngleWrapper>
      <Blur intensity={300}>
        <ColorSelect
          artist={artist}
          currentColor={artwork.color}
          file={file}
          textColor={color}
          title={title}
        />
        <InfoWrapper>
          <Title style={{ color }}>{title}</Title>
          <Year style={{ color }}>{`${artist} - ${year}`}</Year>
          {Array.from({ length: numDisks }, (_, i) => (
            <View key={i}>
              {numDisks > 1 && <DiskName style={{ color }}>{i + 1}</DiskName>}
              <TrackWrapper
                marginTop={i !== 0 && numDisks < 2}
                height={heights[i]}
              >
                {tracks.filter(diskFilter(i)).map(track => (
                  <Track
                    key={track.number}
                    {...track}
                    onPress={selectTrack(track.trackID)}
                    selected={track.trackID === selectedTrack}
                    color={color}
                  />
                ))}
              </TrackWrapper>
            </View>
          ))}
        </InfoWrapper>
      </Blur>
    </ImageBackground>
  );
};

Expanded.propTypes = {
  album: PropTypes.object.isRequired,
  color: PropTypes.object.isRequired,
  file: PropTypes.string.isRequired,
  leftSlashWidth: PropTypes.number.isRequired,
  rightSlashWidth: PropTypes.number.isRequired
};

export default Expanded;
