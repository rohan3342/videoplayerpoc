import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LayoutType } from '../../utils';

const index = ({ defaultView, onViewChange = () => {}, ...props }) => {
  return (
    <View style={styles.container}>
      {Object.entries(LayoutType).map((item) => (
        <Pressable
          key={item[1]}
          style={[
            styles.buttonStyle,
            defaultView === item[1] && { backgroundColor: 'white' },
          ]}
          onPress={onViewChange.bind(this, item[0])}
        >
          <Text
            style={[styles.text, defaultView === item[1] && { color: 'black' }]}
          >
            {item[1]}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    bottom: 0,
    height: 70,
    padding: 12,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 100,
    backgroundColor: '#00000050',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: 120,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 14,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
});
