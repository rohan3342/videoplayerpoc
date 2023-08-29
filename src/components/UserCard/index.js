import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserCard = ({
  name,
  itemWidth,
  itemHeight,
  containerStyle,
  onLayout = () => {},
  ...props
}) => {
  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        itemWidth && { width: itemWidth },
        itemHeight && { height: itemHeight },
        containerStyle && containerStyle,
      ]}
    >
      <View style={styles.subContainer}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    height: '100%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});
