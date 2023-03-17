import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {BOOKMARK_ICON} from '../../../assets/icons';
import {COLOURS} from '../../common/theme';

const Bookmarks = (props: Props) => {
  const {navigation} = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Saved')}>
      <Image source={BOOKMARK_ICON} style={styles.icon} />
    </TouchableOpacity>
  );
};

type Props = {
  navigation: any;
};

export default Bookmarks;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    tintColor: COLOURS.BLACK,
  },
});
