import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {BACK_ICON, BOOKMARK_ICON} from '../../../assets/icons';
import {COLOURS} from '../../common/theme';

const Back = (props: Props) => {
  const {navigation} = props;

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={BACK_ICON} style={styles.icon} />
    </TouchableOpacity>
  );
};

type Props = {
  navigation: any;
};

export default Back;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    tintColor: COLOURS.BLACK,
  },
});
