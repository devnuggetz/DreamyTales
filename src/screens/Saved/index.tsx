import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Search from '../../components/Search';
import {COLOURS, SPACING} from '../../common/theme';
import {TYPOGRAPHY} from '../../common/styles';
import {Story} from '../../utils/types';
import StoryCard from '../../components/StoryCard';
import {RootState} from '../../redux/store';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../utils/hooks';
import {useInterstitialAd} from 'react-native-google-mobile-ads';
import {incrementInitialState} from '../../redux/slices/ads.slice';

const adUnitId = __DEV__
  ? 'ca-app-pub-3940256099942544/1033173712'
  : 'ca-app-pub-4599375922819673/3669124958';

const Saved = ({navigation}) => {
  const {bookmarkedStories} = useSelector((state: RootState) => state.global);

  const {interstitialCount} = useSelector((state: RootState) => state.ads);
  const dispatch = useAppDispatch();
  const {isLoaded, isClosed, load, show} = useInterstitialAd(adUnitId);
  const [selectStory, setSelectStory] = useState<Story>();

  useEffect(() => {
    if (interstitialCount % 3 === 1) {
      load();
    }
  }, [interstitialCount, load]);

  useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      dispatch(incrementInitialState());
      navigation.navigate('Story', {
        storyData: selectStory ? selectStory : bookmarkedStories[0],
      });
    }
  }, [isClosed, navigation, bookmarkedStories, dispatch, selectStory]);

  const handleStoryClick = (item: Story) => {
    if (isLoaded) {
      setSelectStory(item);
      show();
    } else {
      dispatch(incrementInitialState());
      navigation.navigate('Story', {storyData: item});
    }
  };

  const renderStory: ListRenderItem<Story> = ({item}) => {
    return (
      <StoryCard storyData={item} onCardClick={() => handleStoryClick(item)} />
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapper}>
        <Search allowSearch={false} navigation={navigation} />
        <Text style={styles.heading}>Your Saved Stories</Text>
        <View style={styles.storiesWrapper}>
          <FlatList
            renderItem={renderStory}
            data={bookmarkedStories}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Saved;

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
