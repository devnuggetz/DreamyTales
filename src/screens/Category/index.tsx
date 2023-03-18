import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ListRenderItem,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Search from '../../components/Search';

import {COLOURS, SPACING} from '../../common/theme';
import {TYPOGRAPHY} from '../../common/styles';
import {Story} from '../../utils/types';
import StoryCard from '../../components/StoryCard';
import {
  BannerAd,
  BannerAdSize,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';
import {RootState} from '../../redux/store';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../utils/hooks';
import {incrementInitialState} from '../../redux/slices/ads.slice';

const adUnitId = __DEV__
  ? 'ca-app-pub-3940256099942544/1033173712'
  : 'ca-app-pub-4599375922819673/7106355825';

const bannerAdId = __DEV__
  ? 'ca-app-pub-3940256099942544/6300978111'
  : 'ca-app-pub-4599375922819673/6739260986';

const Category = ({navigation, route}) => {
  const {interstitialCount} = useSelector((state: RootState) => state.ads);
  const dispatch = useAppDispatch();
  const {isLoaded, isClosed, load, show} = useInterstitialAd(adUnitId);

  const [selectStory, setSelectStory] = useState<Story>();

  const {categoryData} = route.params;

  const {stories} = categoryData;

  useEffect(() => {
    if (interstitialCount % 3 === 1) {
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

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        style={styles.wrapper}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}>
        <View style={styles.searchWrapper}>
          <Search allowSearch={false} navigation={navigation} />
        </View>
        <Text style={styles.heading}>{categoryData.categoryName}</Text>
        <View style={styles.storiesWrapper}>
          {/* <FlatList
            renderItem={renderStory}
            data={stories}
            showsVerticalScrollIndicator={false}
          /> */}
          {stories.length > 0 &&
            stories.map(item => (
              <StoryCard
                storyData={item}
                onCardClick={() => handleStoryClick(item)}
                key={item.id}
              />
            ))}
        </View>
      </ScrollView>
      <View style={styles.adWrapper}>
        <BannerAd
          unitId={bannerAdId}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  storiesWrapper: {
    paddingBottom: SPACING.X_X_LARGE,
    position: 'relative',
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

  adWrapper: {
    paddingVertical: SPACING.SMALL,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLOURS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchWrapper: {
    backgroundColor: COLOURS.BACKGROUND,
  },
});
