import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../../common/Layout';
import TopStories from '../Home/TopStories';
import {NavigationAsProps} from '../../utils/types';
import TrackPlayer from 'react-native-track-player';

const filePath =
  'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3';

const AudioPlayer = (props: NavigationAsProps) => {
  const {navigation} = props;

  return (
    <Layout>
      <View style={styles.player}>
        <Text>AudioPlayer</Text>
      </View>
      <View>
        <View>
          <Text>In the Queue</Text>
        </View>
        <TopStories navigation={navigation} />
      </View>
    </Layout>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  player: {
    flex: 1,
  },
});
