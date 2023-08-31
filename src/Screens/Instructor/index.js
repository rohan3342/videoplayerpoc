import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  PanResponder,
} from 'react-native';
import React, { useRef } from 'react';

import { UserData } from '../../utils';
import UserCard from '../../components/UserCard';

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};
const item = { height: 100, width: 200 };
const { width, height } = Dimensions.get('window');

const Instructor = () => {
  const localUser = UserData.find((item) => item === 'Rohan');

  const initialPositionRef = useRef({ dx: 20, dy: 20 });
  const pan = useRef(new Animated.ValueXY({ x: 20, y: 20 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => handleRelease(gestureState),
    })
  ).current;

  const handleRelease = (gestureState) => {
    const { dx, dy, moveX, moveY } = gestureState;

    const quad_1 = {
      minWidth: 0,
      maxWidth: width / 2,
      minHeight: 0,
      maxHeight: height / 2,
    };

    const quad_2 = {
      minWidth: width / 2,
      maxWidth: width,
      minHeight: 0,
      maxHeight: height / 2,
    };

    const quad_3 = {
      minWidth: 0,
      maxWidth: width / 2,
      minHeight: height / 2,
      maxHeight: height,
    };

    const quad_4 = {
      minWidth: width / 2,
      maxWidth: width,
      minHeight: height / 2,
      maxHeight: height,
    };

    if (moveY < quad_1.maxHeight || moveY < quad_2.maxHeight) {
      if (moveX <= quad_1.maxWidth) {
        initialPositionRef.current = { dx: 20, dy: 20 };
      } else {
        initialPositionRef.current = { dx: width - 220, dy: 20 };
      }
    } else {
      if (moveX <= quad_3.maxWidth) {
        initialPositionRef.current = { dx: 20, dy: height - 120 };
      } else {
        initialPositionRef.current = { dx: width - 220, dy: height - 120 };
      }
    }
    pan.flattenOffset();
    Animated.spring(pan, {
      toValue: {
        x: initialPositionRef.current.dx,
        y: initialPositionRef.current.dy,
      },
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.localUserView,
          { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
        ]}
        {...panResponder.panHandlers}
      >
        <UserCard
          itemWidth={200}
          itemHeight={100}
          name={localUser}
          key={`${1}_${localUser}`}
        />
      </Animated.View>
      {/* <View style={styles.rowContainer}>
        <View style={styles.row}>
          <View style={styles.quad1}>
            <Text>Quad 1</Text>
            <Text>X: 0 - {height / 2}</Text>
            <Text>Y: 0 - {width / 2}</Text>
          </View>
          <View style={styles.quad2}>
            <Text>Quad 2</Text>
            <Text>X: 0 - {height / 2}</Text>
            <Text>
              Y: {width / 2} - {width}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.quad3}>
            <Text>Quad 3</Text>
            <Text>
              X: {height / 2} - {height}
            </Text>
            <Text>Y: 0 - {width / 2}</Text>
          </View>
          <View style={styles.quad4}>
            <Text>Quad 4</Text>
            <Text>
              X: {height / 2} - {height}
            </Text>
            <Text>
              Y: {width / 2} - {width}
            </Text>
          </View>
        </View>
      </View> */}
    </View>
  );
};

export default Instructor;

const styles = StyleSheet.create({
  container: {
    zIndex: 4,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  videoPlayerView: {
    width: '100%',
    height: '100%',
  },
  localUserView: {
    top: 0,
    left: 0,
    zIndex: 2,
    borderRadius: 5,
    shadowRadius: 10,
    shadowOpacity: 0.2,
    position: 'absolute',
    shadowColor: '#171717',
    backgroundColor: '#ccc',
    shadowOffset: { width: 2, height: 2 },
  },
  rowContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  row: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
  },
  quad1: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    borderTopWidth: 120,
    alignItems: 'center',
    borderLeftWidth: 240,
    borderTopColor: 'red',
    borderLeftColor: 'red',
    justifyContent: 'center',
  },
  quad2: {
    flex: 1,
    borderWidth: 1,
    borderTopWidth: 120,
    alignItems: 'center',
    borderRightWidth: 240,
    borderColor: 'yellow',
    justifyContent: 'center',
    borderTopColor: 'yellow',
    borderRightColor: 'yellow',
  },
  quad3: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'green',
    borderLeftWidth: 240,
    alignItems: 'center',
    borderBottomWidth: 120,
    borderLeftColor: 'green',
    justifyContent: 'center',
    borderBottomColor: 'green',
  },
  quad4: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'pink',
    alignItems: 'center',
    borderRightWidth: 240,
    borderBottomWidth: 120,
    borderRightColor: 'pink',
    justifyContent: 'center',
    borderBottomColor: 'pink',
  },
});
