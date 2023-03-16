import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Story} from '../../utils/types';
import {BORDER_RADIUS, COLOURS} from '../../common/theme';
import {TYPOGRAPHY} from '../../common/styles';

const TopStoryCard = (props: Props) => {
  const {storyData} = props;

  return (
    <View style={styles.wrapper}>
      <Image source={{uri: storyData.thumbnail}} style={styles.thumbnail} />
      <Text style={styles.title}>{storyData.title}</Text>
    </View>
  );
};

export default TopStoryCard;

type Props = {
  storyData: Story;
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: BORDER_RADIUS.MEDIUM,
    flex: 1,
  },
  thumbnail: {
    height: 150,
    width: 225,
    borderTopLeftRadius: BORDER_RADIUS.MEDIUM,
    borderTopRightRadius: BORDER_RADIUS.MEDIUM,
  },
  title: {
    ...TYPOGRAPHY.title,
    color: COLOURS.BLACK,
    textAlign: 'center',
  },
});
