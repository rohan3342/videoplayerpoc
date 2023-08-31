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
      onPanResponderRelease: (e, gestureState) =>
        onPanResponderRelease(gestureState),
    })
  ).current;

  const onPanResponderRelease = (gestureState) => {
    const { moveX, moveY } = gestureState;

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
});
