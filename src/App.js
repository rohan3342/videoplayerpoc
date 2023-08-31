import React, { useEffect, useState } from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';

import Grid from './Screens/Grid';
import { LayoutType } from './utils';
import FloatingButton from './components/FloatingButton';

const App = () => {
  const [defaultView, setDefaultView] = useState('');

  useEffect(() => {
    setDefaultView(LayoutType.GRID);
    DeviceEventEmitter.emit('layoutTypeKey', LayoutType.INSTRUCTOR);
  }, []);

  const onViewChange = (value) => {
    setDefaultView(LayoutType[value]);
    DeviceEventEmitter.emit('layoutTypeKey', LayoutType[value]);
  };

  return (
    <View style={styles.container}>
      <FloatingButton defaultView={defaultView} onViewChange={onViewChange} />
      <Grid />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  scrollView: {},
  scrollViewContentContainerStyle: {
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
});
