import React, { useLayoutEffect, useCallback, useState, useRef } from 'react';
import styled from 'styled-components/native';
import { Animated, Platform, FlatList } from 'react-native';

import Album from './Album';
import Expanded from './Expanded';
import StatusBar from './StatusBar';

import { ARTWORK_SIZE } from '../config';
import { appData } from '@utils/filesystem';
import { libraryType } from '@types';

const CURRENT_SIZE = 'small';

const Footer = styled.View`
  height: 100px;
`;

const Wrapper = styled.View`
  align-items: center;
  flex: 1;
`;

const Grid = ({ data }) => {
  const selectedAlbum = useRef(null);
  const previousSeparator = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [numRowItems, setNumRowItems] = useState(1);
  const items = useRef(data);
  const [color] = useState(new Animated.Value(null));

  useLayoutEffect(() => {
    if (data.length > 0) {
      const rowItems = Math.floor(
        containerWidth / (ARTWORK_SIZE[CURRENT_SIZE] + 40)
      );
      setNumRowItems(rowItems);
      const numEmptyToAdd = data.length % rowItems;
      if (numEmptyToAdd !== 0) {
        const extra = Array.from({ length: numEmptyToAdd }, (_, i) => ({
          artwork: { file: i },
          title: ''
        }));
        items.current = [...items.current, ...extra];
      }
    }
  }, [containerWidth, data.length]);

  // Store the width of the Container
  const getContainerWidth = useCallback(
    ({ nativeEvent }) => setContainerWidth(nativeEvent.layout.width),
    []
  );

  // Store the width of the FlatList
  const getFlatListWidth = useCallback(({ nativeEvent }) => {
    setFlatListWidth(nativeEvent.layout.width);
  }, []);

  const albumPress = useCallback(
    (index, item, separators, doublePress = false) => {
      if (typeof selectedAlbum.current !== 'undefined' && !doublePress) {
        if (previousSeparator.current) {
          previousSeparator.current.unhighlight();
        }
        if (item.albumID === selectedAlbum.current) {
          selectedAlbum.current = null;
          separators.unhighlight();
        } else {
          selectedAlbum.current = item.albumID;
          previousSeparator.current = separators;
          color.setValue(item.artwork.color);
          separators.updateProps('trailing', {
            color,
            highlighted: true,
            index,
            selected: item
          });
        }
      }
    },
    [color]
  );

  const renderItem = useCallback(
    ({ index, item, separators }) => {
      if ('artwork' in item === false) return <></>;
      if (typeof item.artwork.file === 'string') {
        return (
          <Album
            album={item}
            file={`file://${appData}album-art/${item.artwork.file}`}
            setSelected={albumPress}
            index={index}
            separators={separators}
            size={CURRENT_SIZE}
          />
        );
      } else {
        return <></>;
      }
    },
    [albumPress]
  );

  const itemSeparator = useCallback(
    ({ highlighted, ...separatorProps }) => {
      if (!highlighted || typeof selectedAlbum.current === 'undefined')
        return <></>;
      const { color, index, selected } = separatorProps;
      if (selected.albumID !== selectedAlbum.current) return <></>;

      const leftSlashWidth =
        (flatListWidth / numRowItems) * ((index % numRowItems) + 1) -
        (ARTWORK_SIZE[CURRENT_SIZE] + 40) / 2;
      const rightSlashWidth =
        (flatListWidth / numRowItems) *
        (numRowItems - (index % numRowItems) + 1);
      const file = `file://${appData}album-art/${selected.artwork.file}`;
      return (
        <Expanded
          color={color}
          size={CURRENT_SIZE}
          leftSlashWidth={leftSlashWidth}
          rightSlashWidth={rightSlashWidth}
          album={selected}
          file={file}
        />
      );
    },
    [flatListWidth, numRowItems]
  );

  const keyExtractor = useCallback(item => item.albumID, []);

  return (
    <Wrapper onLayout={getContainerWidth}>
      <FlatList
        onLayout={getFlatListWidth}
        ItemSeparatorComponent={itemSeparator}
        key={numRowItems}
        keyExtractor={keyExtractor}
        ListFooterComponent={Footer}
        numColumns={Platform.OS === 'web' ? numRowItems : 1}
        data={items.current}
        extraData={color}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar />
    </Wrapper>
  );
};

Grid.propTypes = {
  data: libraryType
};

export default Grid;
