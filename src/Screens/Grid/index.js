import React, { memo, useMemo } from 'react';
import { FlatList, Dimensions, StyleSheet } from 'react-native';

import UserCard from '../../components/UserCard';
import { UserData, splitArrayIntoChunks } from '../../utils';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Grid = ({ ...props }) => {
  const listData = useMemo(() => splitArrayIntoChunks(UserData, false));

  const renderItem = ({ item, index }) => (
    <GridLayout list={item} index={index} />
  );

  return (
    listData.length > 0 && (
      <FlatList
        horizontal
        data={listData}
        bounces={false}
        bouncesZoom={false}
        pagingEnabled={true}
        initialScrollIndex={0}
        renderItem={renderItem}
        decelerationRate={'fast'}
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentContainerStyle}
      />
    )
  );
};

const GridLayout = memo(({ list }) => {
  return (
    <FlatList
      data={list}
      numColumns={4}
      bounces={false}
      bouncesZoom={false}
      style={styles.grid}
      renderItem={({ item, index }) => {
        console.log('index', index);
        return (
          <UserCard
            name={item}
            index={index}
            containerStyle={{
              height: HEIGHT * 0.32,
              width: (WIDTH - 16) * 0.25,
            }}
          />
        );
      }}
      contentContainerStyle={{ alignItems: 'center' }}
      keyExtractor={(item, index) => `${item}_${index}`}
    />
  );
});

export default memo(Grid);

const styles = StyleSheet.create({
  scrollView: {},
  scrollViewContentContainerStyle: {},
  grid: {
    width: WIDTH,
    height: HEIGHT,
  },
  gridRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
