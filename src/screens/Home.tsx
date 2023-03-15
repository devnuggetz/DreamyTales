import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOURS} from '../common/theme';
import {TYPOGRAPHY} from '../common/styles';

const Home = () => {
  return (
    <View>
      <Text style={{...styles.heading}}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    color: COLOURS.WHITE,
    ...TYPOGRAPHY.heading,
  },
});
