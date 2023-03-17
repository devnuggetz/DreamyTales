import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React from 'react';
import Layout from '../../common/Layout';
import Search from '../../components/Search';
import Back from '../../components/Back';
import Categories from '../Home/Categories';
import {COLOURS, SPACING} from '../../common/theme';
import {TYPOGRAPHY} from '../../common/styles';
import {TOP_STORIES} from '../../data';
import {Story} from '../../utils/types';
import StoryCard from '../../components/StoryCard';

const Category = ({navigation}) => {
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
            data={TOP_STORIES}
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
