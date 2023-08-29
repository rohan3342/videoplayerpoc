import Video from 'react-native-video';
import { StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';

const VideoPlayer = ({ playUrl, ...props }) => {
  let videoPlayerRef = useRef(null);

  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const [currentTime, setCurrentTime] = useState(0.0);

  function onLoad(data) {
    console.log('data', data);
    setDuration(data);
  }

  function onProgress(data) {
    setCurrentTime(data);
  }

  function onEnd() {
    setPaused(true);
  }

  function onAudioBecomingNoisy() {
    setPaused(true);
  }

  return playUrl ? (
    <Video
      onEnd={onEnd}
      repeat={true}
      muted={true}
      onLoad={onLoad}
      resizeMode='cover'
      disableFocus={true}
      ref={videoPlayerRef}
      onProgress={onProgress}
      style={styles.container}
      source={{ uri: playUrl }}
      onError={(error) => {
        console.log('Player', error);
      }}
      onAudioBecomingNoisy={onAudioBecomingNoisy}
    />
  ) : null;
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});
