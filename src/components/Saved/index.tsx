import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {BOOKMARK_ICON} from '../../../assets/icons';
import {COLOURS} from '../../common/theme';

const Saved = () => {
  return (
    <View>
      <Image source={BOOKMARK_ICON} style={styles.icon} />
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    tintColor: COLOURS.BLACK,
  },
});
