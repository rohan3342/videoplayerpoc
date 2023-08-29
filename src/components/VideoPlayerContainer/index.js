import React, { useEffect, useState } from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';

import { LayoutType } from '../../utils';
import VideoPlayer from '../VideoPlayer';

const VideoPlayerContainer = ({ defaultView, ...props }) => {
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
        padding: defaultView === LayoutType.INSTRUCTOR ? 0 : 4,
      }}
    >
      <VideoPlayer
        playUrl={'http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8'}
      />
    </View>
  ) : null;
};

export default VideoPlayerContainer;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'absolute',
  },
});
