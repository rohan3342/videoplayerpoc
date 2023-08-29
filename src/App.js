import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import Grid from './Screens/Grid';
import { LayoutType } from './utils';
import Pinned from './Screens/Pinned';
import Instructor from './Screens/Instructor';
import FloatingButton from './components/FloatingButton';
import VideoPlayerContainer from './components/VideoPlayerContainer';

const App = () => {
  const [defaultView, setDefaultView] = useState(LayoutType.GRID);

  const onViewChange = (value) => {
    setDefaultView(LayoutType[value]);
  };

  const ShowView = () => {
    switch (defaultView) {
      case LayoutType.GRID:
        return <Grid />;
      case LayoutType.PINNED:
        return <Pinned />;
      case LayoutType.INSTRUCTOR:
        return <Instructor />;
    }
  };

  return (
    <View style={styles.container}>
      <FloatingButton defaultView={defaultView} onViewChange={onViewChange} />
      <View style={styles.mainContainer}>
        <ShowView />
      </View>
      <VideoPlayerContainer />
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
