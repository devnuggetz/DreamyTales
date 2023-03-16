import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {PLAY_ICON} from '../../../assets/icons';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';
import {TYPOGRAPHY} from '../../common/styles';

const ListenStoryButton = (props: Props) => {
  const {onPress} = props;

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Image source={PLAY_ICON} style={styles.icon} />
      <Text style={styles.btnTxt}>Listen to this story</Text>
    </TouchableOpacity>
  );
};

type Props = {
  onPress: () => void;
};

export default ListenStoryButton;

const styles = StyleSheet.create({
  icon: {
    tintColor: COLOURS.SECONDARY,
    height: 32,
    width: 32,
  },
  wrapper: {
    backgroundColor: COLOURS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.MEDIUM,
    paddingVertical: SPACING.SMALL,
    alignSelf: 'flex-start',
    paddingLeft: SPACING.MEDIUM,
    paddingRight: SPACING.LARGE,
    marginVertical: SPACING.SMALL,
  },
  btnTxt: {
    ...TYPOGRAPHY.subHeading,
    color: COLOURS.BLACK,
  },
});
