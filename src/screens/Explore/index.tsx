import {
  FlatList,
  Image,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';
import {SEARCH_ICON} from '../../../assets/icons';
import {TYPOGRAPHY} from '../../common/styles';
import {Story} from '../../utils/types';
import StoryCard from '../../components/StoryCard';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const Explore = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Story[]>([]);
  const ref = useRef<any>(null);

  const {allStories} = useSelector((state: RootState) => state.global);

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.focus();
      }, 100);
    }
    setData(allStories);
  }, [allStories]);

  const handleSearchInput = (search: string) => {
    setSearch(search);
    setData(
      allStories.filter(
        (story: Story) =>
          story.title.toLowerCase().includes(search.toLowerCase()) ||
          story.categories.some(item => item.includes(search)),
      ),
    );
  };

  const renderStory: ListRenderItem<Story> = ({item}) => {
    return (
      <StoryCard
        storyData={item}
        onCardClick={() => navigation.navigate('Story', {storyData: item})}
      />
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.searchWrapper}>
        <Image source={SEARCH_ICON} style={styles.search_icon} />

        <TextInput
          style={styles.input}
          placeholder="Search any story or category"
          ref={ref}
          value={search}
          onChangeText={e => handleSearchInput(e)}
        />
      </View>

      <View style={styles.storiesWrapper}>
        <FlatList
          renderItem={renderStory}
          data={data}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: SPACING.X_X_LARGE,
    backgroundColor: COLOURS.BACKGROUND,
    paddingHorizontal: SPACING.SMALL,
  },
  searchWrapper: {
    backgroundColor: COLOURS.WHITE,
    marginVertical: SPACING.MEDIUM,
    borderRadius: BORDER_RADIUS.MEDIUM,
    paddingHorizontal: SPACING.SMALL,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'scroll',
  },
  search_icon: {
    height: 18,
    width: 18,
    marginRight: SPACING.X_SMALL,
  },
  input: {
    ...TYPOGRAPHY.text,
    overflow: 'scroll',
    width: '90%',
  },
  storiesWrapper: {
    paddingBottom: SPACING.X_X_LARGE * 3,
  },
});
