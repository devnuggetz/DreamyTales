import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Story} from '../../utils/types';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';
import {TYPOGRAPHY} from '../../common/styles';

const StoryCard = (props: Props) => {
  const {storyData, onCardClick} = props;

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onCardClick}>
      <Image source={{uri: storyData.thumbnail}} style={styles.banner} />
      <View style={styles.info}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{storyData.title}</Text>
        </View>
        <View style={styles.readBtn}>
          <Text style={{...TYPOGRAPHY.text, color: COLOURS.BLACK}}>Read</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

type Props = {
  storyData: Story;
  onCardClick: () => void;
};

export default StoryCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLOURS.WHITE,
    marginVertical: SPACING.SMALL,
    borderRadius: BORDER_RADIUS.MEDIUM,
    padding: SPACING.SMALL,
  },
  banner: {
    height: 160,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: SPACING.MEDIUM,
  },
  title: {
    ...TYPOGRAPHY.title,
    color: COLOURS.BLACK,
  },
  info: {
    padding: SPACING.MEDIUM,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    width: '60%',
  },
  readBtn: {
    borderWidth: 1,
    paddingHorizontal: SPACING.SMALL,
    paddingVertical: SPACING.X_SMALL,
    borderRadius: BORDER_RADIUS.MEDIUM,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOURS.BACKGROUND,
    borderColor: COLOURS.SECONDARY,
  },
});
