import React, { useLayoutEffect, useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { Animated, Platform } from 'react-native';

import Album from './Album';
import Expanded from './Expanded';

import { ARTWORK_SIZE } from '../config';
import { appData } from '@utils/filesystem';
import { libraryType } from '@types';

const CURRENT_SIZE = 'small';

const FlatList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false
})``;

const Wrapper = styled.View`
  align-items: center;
  flex: 1;
`;

const Grid = ({ data }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [numRowItems, setNumRowItems] = useState(1);
  const [extra, setExtra] = useState([]);
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
        setExtra(extra);
      }
    }
  }, [containerWidth, data.length]);

  // Store the width of the Container
  const getContainerWidth = ({ nativeEvent }) =>
    setContainerWidth(nativeEvent.layout.width);

  // Store the width of the FlatList
  const getFlatListWidth = ({ nativeEvent }) =>
    setFlatListWidth(nativeEvent.layout.width);

  // Set the selected album using the artwork file (because its a UUID)
  const setSelected = (index, item, separators) => () => {
    setSelectedAlbum(item.artwork.file);
    color.setValue(item.artwork.color);
    separators.updateProps('trailing', {
      color,
      highlighted: true,
      index,
      selected: item
    });
  };

  const renderItem = ({ index, item, separators }) => {
    if ('artwork' in item === false) return <></>;
    if (typeof item.artwork.file === 'string') {
      return (
        <Album
          album={item}
          file={`file://${appData}album-art/${item.artwork.file}`}
          setSelected={setSelected(index, item, separators)}
          size={CURRENT_SIZE}
        />
      );
    } else {
      return <></>;
    }
  };

  const itemSeparator = useCallback(
    ({ highlighted, ...separatorProps }) => {
      if (!highlighted) return <></>;
      const { color, index, selected } = separatorProps;
      if (selected.artwork.file !== selectedAlbum) return <></>;

      const leftSlashWidth =
        (flatListWidth / numRowItems) * ((index % numRowItems) + 1) -
        (ARTWORK_SIZE[CURRENT_SIZE] + 40) / 2;
      const rightSlashWidth =
        (flatListWidth / numRowItems) *
        (numRowItems - (index % numRowItems) + 1);
      return (
        <Expanded
          color={color}
          size={CURRENT_SIZE}
          leftSlashWidth={leftSlashWidth}
          rightSlashWidth={rightSlashWidth}
          album={selected}
          file={`file://${appData}album-art/${selected.artwork.file}`}
        />
      );
    },
    [flatListWidth, numRowItems, selectedAlbum]
  );

  const keyExtractor = item =>
    (item.artwork && item.artwork.file) || item.title;

  return (
    <Wrapper onLayout={getContainerWidth}>
      <FlatList
        onLayout={getFlatListWidth}
        ItemSeparatorComponent={itemSeparator}
        key={numRowItems}
        keyExtractor={keyExtractor}
        numColumns={Platform.OS === 'web' ? numRowItems : 1}
        data={[...data, ...extra]}
        extraData={color}
        renderItem={renderItem}
      />
    </Wrapper>
  );
};

Grid.propTypes = {
  data: libraryType
};

export default Grid;
