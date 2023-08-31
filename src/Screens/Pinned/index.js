import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import React from 'react';

import { UserData } from '../../utils';
import UserCard from '../../components/UserCard';

const Pinned = () => {
  const userList = UserData.filter((item) => item !== 'Video Player');

  const itemWidth = () => {
    return Dimensions.get('window').width * 0.25;
  };

  const itemHeight = () => {
    return Dimensions.get('window').height * 0.25;
  };

  return (
    <View style={styles.container}>
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

export default Pinned;

const styles = StyleSheet.create({
  container: {
    top: 0,
    right: 0,
    zIndex: 1,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width * 0.25,
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
