import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TYPOGRAPHY} from '../../../common/styles';
import {TOP_STORIES} from '../../../data';
import {Story} from '../../../utils/types';
import {COLOURS, SPACING} from '../../../common/theme';
import TopStoryCard from '../../../components/TopStoryCard';

const TopStories = () => {
  const renderCategory: ListRenderItem<Story> = ({item}) => {
    return <TopStoryCard storyData={item} />;
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Top Stories</Text>
      <FlatList
        data={TOP_STORIES}
        renderItem={renderCategory}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{width: 12}} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default TopStories;

const styles = StyleSheet.create({
  heading: {
    ...TYPOGRAPHY.subHeading,
    marginVertical: SPACING.MEDIUM,
    color: COLOURS.BLACK,
  },
  wrapper: {
    marginVertical: SPACING.MEDIUM,
  },
});
