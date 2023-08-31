import {
  FlatList,
  Dimensions,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react';

import Pinned from '../Pinned';
import Instructor from '../Instructor';
import UserCard from '../../components/UserCard';
import { UserData, LayoutType, splitArrayIntoChunks } from '../../utils';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Grid = ({ ...props }) => {
  const [defaultView, setDefaultView] = useState('');

  useEffect(() => {
    DeviceEventEmitter.addListener('layoutTypeKey', (value) => {
      setDefaultView(value);
    });
  }, []);

  const listData = useMemo(() => splitArrayIntoChunks(UserData, false));

  return (
    <Fragment>
      <PagerView
        initialPage={0}
        style={styles.scrollView}
        scrollEnabled={
          defaultView !== LayoutType.PINNED &&
          defaultView !== LayoutType.INSTRUCTOR
        }
      >
        {listData.map((item, index) => (
          <GridLayout key={index} list={item} rowIndex={index} />
        ))}
      </PagerView>
      {/* {listData.length > 0 && (
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
          scrollEnabled={
            defaultView !== LayoutType.INSTRUCTOR &&
            defaultView !== LayoutType.PINNED
          }
          contentContainerStyle={styles.scrollViewContentContainerStyle}
        />
      )} */}
      {defaultView === LayoutType.PINNED && <Pinned />}
      {defaultView === LayoutType.INSTRUCTOR && <Instructor />}
    </Fragment>
  );
};

const GridLayout = memo(({ list, rowIndex }) => {
  const [defaultView, setDefaultView] = useState('');

  useEffect(() => {
    DeviceEventEmitter.addListener('layoutTypeKey', (value) => {
      setDefaultView(value);
    });
  }, []);

  return (
    <FlatList
      data={list}
      numColumns={4}
      bounces={false}
      bouncesZoom={false}
      style={styles.grid}
      renderItem={({ item, index }) => {
        console.log('index', index);
        if (
          (defaultView === LayoutType.INSTRUCTOR ||
            defaultView === LayoutType.PINNED) &&
          !(rowIndex === 0 && index === 0)
        ) {
          return;
        }
        return (
          <UserCard
            name={item}
            index={index}
            showPlayer={rowIndex === 0 && index === 0}
            containerStyle={{
              height:
                defaultView === LayoutType.INSTRUCTOR ||
                defaultView === LayoutType.PINNED
                  ? HEIGHT
                  : HEIGHT * 0.32,
              width:
                defaultView === LayoutType.INSTRUCTOR
                  ? WIDTH
                  : defaultView === LayoutType.PINNED
                  ? WIDTH * 0.75
                  : (WIDTH - 16) * 0.25,
            }}
          />
        );
      }}
      keyExtractor={(item, index) => `${item}_${index}`}
      contentContainerStyle={{
        alignItems: defaultView === LayoutType.GRID ? 'center' : 'flex-start',
      }}
    />
  );
});

export default memo(Grid);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
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
