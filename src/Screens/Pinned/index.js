import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import React from 'react';

import { UserData } from '../../utils';
import UserCard from '../../components/UserCard';

const Grid = () => {
  const numColumns = 3;
  const userList = UserData.filter((item) => item !== 'Video Player');
  const videoPlayer = UserData.find((item) => item === 'Video Player');

  const itemWidth = () => {
    return (Dimensions.get('window').width - 32) * 0.25;
  };

  const itemHeight = () => {
    return (Dimensions.get('window').height - 82) * 0.25;
  };

  return (
    <View style={styles.container}>
      <UserCard
        name={videoPlayer}
        itemWidth={'75%'}
        itemHeight={'100%'}
        key={`${0}_${videoPlayer}`}
        containerStyle={{ margin: 0 }}
        onLayout={({ nativeEvent }) => {
          DeviceEventEmitter.emit('videoPlayerStyle', nativeEvent.layout);
        }}
      />
      <FlatList
        bounces={false}
        data={userList}
        bouncesZoom={false}
        decelerationRate={'fast'}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <UserCard
            name={item}
            index={index}
            itemWidth={itemWidth()}
            itemHeight={itemHeight()}
            containerStyle={{ marginTop: 0 }}
          />
        )}
        keyExtractor={(item, index) => `${index}_${item}`}
      />
    </View>
  );
};

export default Grid;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  videoPlayerView: {},
  localUserView: {
    top: 8,
    right: 8,
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
