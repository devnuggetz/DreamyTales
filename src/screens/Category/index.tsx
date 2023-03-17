import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React from 'react';

import Search from '../../components/Search';

import {COLOURS, SPACING} from '../../common/theme';
import {TYPOGRAPHY} from '../../common/styles';
import {Story} from '../../utils/types';
import StoryCard from '../../components/StoryCard';

const Category = ({navigation, route}) => {
  const {categoryData} = route.params;

  const {stories} = categoryData;

  console.log(categoryData, 'hehhe');

  const renderStory: ListRenderItem<Story> = ({item}) => {
    return <StoryCard storyData={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapper}>
        <Search allowSearch={false} navigation={navigation} />
        <Text style={styles.heading}>Fairy Tale Stories</Text>
        <View style={styles.storiesWrapper}>
          <FlatList
            renderItem={renderStory}
            data={stories}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  storiesWrapper: {
    paddingBottom: SPACING.X_X_LARGE * 3,
  },

  heading: {
    ...TYPOGRAPHY.subHeading,
    color: COLOURS.BLACK,
    marginBottom: SPACING.MEDIUM,
  },
  wrapper: {
    flex: 1,
    paddingBottom: SPACING.X_X_LARGE,
    backgroundColor: COLOURS.BACKGROUND,
    paddingHorizontal: SPACING.SMALL,
  },
});
