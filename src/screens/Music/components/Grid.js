import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Album from './Album/';
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

const Grid = ({ data = [] }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [numRowItems, setNumRowItems] = useState(1);
  const [extra, setExtra] = useState([]);

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
  }, [containerWidth, data, data.length]);

  // Store the width of the Container
  const getContainerWidth = ({ nativeEvent }) =>
    setContainerWidth(nativeEvent.layout.width);

  // Store the width of the FlatList
  const getFlatListWidth = ({ nativeEvent }) =>
    setFlatListWidth(nativeEvent.layout.width);

  // Set the selected album using the artwork file (because its a UUID)
  const setSelected = artwork => () => setSelectedAlbum(artwork);

  const renderItem = ({ item }) => {
    if (typeof item.artwork.file === 'string') {
      return (
        <Album
          album={item}
          file={`file://${appData}album-art/${item.artwork.file}`}
          setSelected={setSelected}
          size={CURRENT_SIZE}
        />
      );
    } else {
      return <></>;
    }
  };

  const itemSeparator = ({ leadingItem }) => {
    if (Array.isArray(leadingItem)) {
      const selected = leadingItem.find(
        item => item.artwork.file === selectedAlbum
      );
      const index = leadingItem.findIndex(
        item => item.artwork.file === selectedAlbum
      );
      const leftSlashWidth =
        (flatListWidth / numRowItems) * (index + 1) -
        (ARTWORK_SIZE[CURRENT_SIZE] + 40) / 2;
      const rightSlashWidth =
        (flatListWidth / numRowItems) * (numRowItems - index + 1);

      return selected ? (
        <Expanded
          size={CURRENT_SIZE}
          leftSlashWidth={leftSlashWidth}
          rightSlashWidth={rightSlashWidth}
          album={selected}
          file={`file://${appData}album-art/${selected.artwork.file}`}
        />
      ) : (
        <></>
      );
    }
    return <></>;
  };

  itemSeparator.propTypes = {
    leadingItem: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  };

  return (
    <Wrapper onLayout={getContainerWidth}>
      <FlatList
        onLayout={getFlatListWidth}
        ItemSeparatorComponent={itemSeparator}
        key={numRowItems}
        keyExtractor={item => item.artwork.file || item.title}
        numColumns={Platform.OS === 'web' ? numRowItems : 1}
        data={data.length > 0 ? [...data, ...extra] : []}
        extraData={data}
        renderItem={renderItem}
      />
    </Wrapper>
  );
};

Grid.propTypes = {
  data: libraryType
};

export default Grid;
