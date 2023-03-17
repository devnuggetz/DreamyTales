import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TYPOGRAPHY} from '../../../common/styles';
import {NavigationAsProps, Story} from '../../../utils/types';
import {COLOURS, SPACING} from '../../../common/theme';
import TopStoryCard from '../../../components/TopStoryCard';
import {RootState} from '../../../redux/store';
import {useSelector} from 'react-redux';

const TopStories = (props: NavigationAsProps) => {
  const {navigation} = props;

  const {topStories} = useSelector((state: RootState) => state.global);

  const renderCategory: ListRenderItem<Story> = ({item}) => {
    return <TopStoryCard storyData={item} navigation={navigation} />;
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Top Stories</Text>
      <FlatList
        data={topStories}
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
