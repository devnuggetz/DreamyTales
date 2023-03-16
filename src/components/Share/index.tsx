import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SHARE_ICON} from '../../../assets/icons';
import {COLOURS} from '../../common/theme';

const Share = (props: Props) => {
  const {navigation} = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Saved')}>
      <Image source={SHARE_ICON} style={styles.icon} />
    </TouchableOpacity>
  );
};

type Props = {
  navigation: any;
};

export default Share;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    tintColor: COLOURS.BLACK,
  },
});
