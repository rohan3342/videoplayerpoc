import React, { useEffect, useState } from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';

import VideoPlayer from '../VideoPlayer';

const VideoPlayerContainer = ({ ...props }) => {
  const [layoutData, setLayoutData] = useState(null);

  useEffect(() => {
    DeviceEventEmitter.addListener('videoPlayerStyle', (data) => {
      setLayoutData({
        x: data?.x || 0,
        y: data?.y || 0,
        width: data?.width || 0,
        height: data?.height || 0,
      });
    });
  }, []);

  return layoutData ? (
    <View
      style={{
        ...styles.container,
        top: layoutData.y,
        left: layoutData.x,
        width: layoutData.width,
        height: layoutData.height,
      }}
    >
      <VideoPlayer
        playUrl={'http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8'}
        // playUrl={
        //   'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        // }
      />
    </View>
  ) : null;
};

export default VideoPlayerContainer;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    padding: 4,
    position: 'absolute',
  },
});
