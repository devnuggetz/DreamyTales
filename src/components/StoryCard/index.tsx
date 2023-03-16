import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationAsProps, Story} from '../../utils/types';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';
import {TYPOGRAPHY} from '../../common/styles';

const StoryCard = (props: Props) => {
  const {storyData} = props;

  return (
    <View style={styles.wrapper}>
      <Image source={{uri: storyData.thumbnail}} style={styles.banner} />
      <View style={styles.rightSide}>
        <Text style={styles.title}>{storyData.title}</Text>
      </View>
    </View>
  );
};

type Props = {
  storyData: Story;
} & NavigationAsProps;

export default StoryCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLOURS.WHITE,
    marginVertical: SPACING.SMALL,
    borderRadius: BORDER_RADIUS.MEDIUM,
  },
  banner: {
    height: 120,
    width: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: SPACING.MEDIUM,
    borderBottomLeftRadius: SPACING.MEDIUM,
  },
  title: {
    ...TYPOGRAPHY.title,
    color: COLOURS.BLACK,
    textAlign: 'right',
  },
  rightSide: {
    padding: SPACING.MEDIUM,
    flex: 1,
  },
});
