import React from 'react';
import { DeviceEventEmitter, Dimensions, StyleSheet, View } from 'react-native';

import { UserData } from '../../utils';
import UserCard from '../../components/UserCard';

const Instructor = () => {
  const numColumns = 4;
  const localUser = UserData.find((item) => item === 'Rohan');
  const videoPlayer = UserData.find((item) => item === 'Video Player');

  const itemWidth = () => {
    return (Dimensions.get('window').width - 32) / numColumns;
  };

  const itemHeight = () => {
    return (Dimensions.get('window').height - 82) / numColumns;
  };

  return (
    <View style={styles.container}>
      <UserCard
        name={videoPlayer}
        itemWidth={'100%'}
        itemHeight={'100%'}
        key={`${0}_${videoPlayer}`}
        onLayout={({ nativeEvent }) => {
          DeviceEventEmitter.emit('videoPlayerStyle', nativeEvent.layout);
        }}
      />
      <View style={styles.localUserView}>
        <UserCard
          name={localUser}
          itemWidth={itemWidth()}
          key={`${1}_${localUser}`}
          itemHeight={itemHeight()}
        />
      </View>
    </View>
  );
};

export default Instructor;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoPlayerView: {},
  localUserView: {
    top: 16,
    right: 16,
    zIndex: 3,
    borderRadius: 5,
    shadowRadius: 10,
    shadowOpacity: 0.2,
    position: 'absolute',
    shadowColor: '#171717',
    backgroundColor: '#ccc',
    shadowOffset: { width: 2, height: 2 },
  },
});
