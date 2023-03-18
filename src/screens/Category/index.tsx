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
import {
  AdEventType,
  InterstitialAd,
  TestIds,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';
import {RootState} from '../../redux/store';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../utils/hooks';
import {incrementInitialState} from '../../redux/slices/ads.slice';

const adUnitId = __DEV__
  ? 'ca-app-pub-3940256099942544/1033173712'
  : 'ca-app-pub-4599375922819673/7106355825';

const Category = ({navigation, route}) => {
  const {interstitialCount} = useSelector((state: RootState) => state.ads);
  const dispatch = useAppDispatch();
  const [selectStory, setSelectStory] = useState<Story>();

  const {categoryData} = route.params;

  const {stories} = categoryData;

  const {isLoaded, isClosed, load, show} = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    if (interstitialCount % 3 === 0) {
      console.log('Load called', interstitialCount);
      load();
    }
  }, [interstitialCount, load]);

  useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      dispatch(incrementInitialState());
      navigation.navigate('Story', {
        storyData: selectStory ? selectStory : stories[0],
      });
    }
  }, [isClosed, navigation, selectStory, stories, dispatch]);

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
        <Text style={styles.heading}>{categoryData.categoryName}</Text>
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
