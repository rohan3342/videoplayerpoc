import {
  View,
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
import {
  UserData,
  LayoutType,
  splitArrayForGrid,
  splitArrayIntoChunks,
} from '../../utils';

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
        // scrollEnabled={
        //   defaultView !== LayoutType.PINNED &&
        //   defaultView !== LayoutType.INSTRUCTOR
        // }
      >
        {listData.map((item, index) => (
          <GridLayout key={index} list={item} index={index} />
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

const GridLayout = memo(({ list, index }) => {
  const splitListData = splitArrayForGrid(list, false);
  const numRows = splitListData?.length;
  const numColumns = Math.max(...splitListData.map((group) => group.length));
  const columnWidth = 100 / numColumns + '%';
  const rowHeight =
    numColumns === 1 ? '100%' : numRows === 1 ? '50%' : 100 / numRows + '%';

  const [defaultView, setDefaultView] = useState('');

  useEffect(() => {
    DeviceEventEmitter.addListener('layoutTypeKey', (value) => {
      setDefaultView(value);
    });
  }, []);

  return (
    <View style={styles.grid}>
      {splitListData.map((group, rowIndex) => {
        if (
          (defaultView === LayoutType.INSTRUCTOR ||
            defaultView === LayoutType.PINNED) &&
          rowIndex !== 0 &&
          index !== 0
        ) {
          return;
        }
        return (
          <View
            key={rowIndex}
            style={[
              styles.gridRow,
              {
                width:
                  defaultView === LayoutType.INSTRUCTOR
                    ? WIDTH
                    : defaultView === LayoutType.PINNED
                    ? WIDTH * 0.75
                    : '100%',
                height:
                  defaultView === LayoutType.INSTRUCTOR ||
                  defaultView === LayoutType.PINNED
                    ? HEIGHT
                    : rowHeight,
              },
            ]}
          >
            {group.map((_item, _index) => {
              if (
                (defaultView === LayoutType.INSTRUCTOR ||
                  defaultView === LayoutType.PINNED) &&
                rowIndex !== 0 &&
                index !== 0 &&
                _index !== 0
              ) {
                return;
              }
              return (
                <UserCard
                  name={_item}
                  index={_index}
                  key={`${_index}_${_item}`}
                  showPlayer={index === 0 && rowIndex === 0 && _index === 0}
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
            })}
          </View>
        );
      })}
    </View>
  );
});

// const GridLayout = memo(({ list, rowIndex }) => {
//   const [defaultView, setDefaultView] = useState('');

//   useEffect(() => {
//     DeviceEventEmitter.addListener('layoutTypeKey', (value) => {
//       setDefaultView(value);
//     });
//   }, []);

//   return (
//     <FlatList
//       data={list}
//       numColumns={4}
//       bounces={false}
//       bouncesZoom={false}
//       style={styles.grid}
//       renderItem={({ item, index }) => {
//         if (
//           (defaultView === LayoutType.INSTRUCTOR ||
//             defaultView === LayoutType.PINNED) &&
//           !(rowIndex === 0 && index === 0)
//         ) {
//           return;
//         }
//         return (
//           <UserCard
//             name={item}
//             index={index}
//             showPlayer={rowIndex === 0 && index === 0}
//             containerStyle={{
//               height:
//                 defaultView === LayoutType.INSTRUCTOR ||
//                 defaultView === LayoutType.PINNED
//                   ? HEIGHT
//                   : HEIGHT * 0.32,
//               width:
//                 defaultView === LayoutType.INSTRUCTOR
//                   ? WIDTH
//                   : defaultView === LayoutType.PINNED
//                   ? WIDTH * 0.75
//                   : (WIDTH - 16) * 0.25,
//             }}
//           />
//         );
//       }}
//       keyExtractor={(item, index) => `${item}_${index}`}
//       contentContainerStyle={{
//         alignItems: defaultView === LayoutType.GRID ? 'center' : 'flex-start',
//       }}
//     />
//   );
// });

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
