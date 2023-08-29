import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import React from 'react';

import UserCard from '../../components/UserCard';
import { UserData, splitArrayForGrid, splitArrayIntoChunks } from '../../utils';

const Grid = ({ ...props }) => {
  const listData = splitArrayIntoChunks(UserData, false);

  return (
    listData.length > 0 && (
      <FlatList
        horizontal
        data={listData}
        bounces={false}
        bouncesZoom={false}
        initialScrollIndex={0}
        pagingEnabled={true}
        onMomentumScrollBegin={({ nativeEvent }) => {
          console.log('onMomentumScrollBegin', nativeEvent);
        }}
        onScroll={({ nativeEvent }) => {
          // console.log('onScroll', nativeEvent);
        }}
        renderItem={({ item, index }) => (
          <GridLayout list={item} index={index} />
        )}
        decelerationRate={'fast'}
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentContainerStyle}
      />
    )
  );
};

const GridLayout = ({ list, index }) => {
  const splitListData = splitArrayForGrid(list, false);
  const numRows = splitListData?.length;
  const numColumns = Math.max(...splitListData.map((group) => group.length));
  const columnWidth = 100 / numColumns + '%';
  const rowHeight =
    numColumns === 1 ? '100%' : numRows === 1 ? '50%' : 100 / numRows + '%';

  return (
    <View style={styles.grid}>
      {splitListData.map((group, rowIndex) => (
        <View key={rowIndex} style={[styles.gridRow, { height: rowHeight }]}>
          {group.map((_item, _index) => (
            <UserCard
              name={_item}
              index={index}
              itemWidth={columnWidth}
              key={`${_index}_${_item}`}
              containerStyle={{ margin: 0 }}
              onLayout={({ nativeEvent }) => {
                if (index === 0 && rowIndex === 1 && _index === 0)
                  DeviceEventEmitter.emit(
                    'videoPlayerStyle',
                    nativeEvent.layout
                  );
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default Grid;

const styles = StyleSheet.create({
  scrollView: {},
  scrollViewContentContainerStyle: {},
  grid: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  gridRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
