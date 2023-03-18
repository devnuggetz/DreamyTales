import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TYPOGRAPHY} from '../../../common/styles';
import {NavigationAsProps, Story} from '../../../utils/types';
import {COLOURS, SPACING} from '../../../common/theme';
import TopStoryCard from '../../../components/TopStoryCard';
import {RootState} from '../../../redux/store';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../utils/hooks';
import {useInterstitialAd} from 'react-native-google-mobile-ads';
import {incrementInitialState} from '../../../redux/slices/ads.slice';

const adUnitId = __DEV__
  ? 'ca-app-pub-3940256099942544/1033173712'
  : 'ca-app-pub-4599375922819673/5346288263';

const TopStories = (props: NavigationAsProps) => {
  const {navigation} = props;

  const {interstitialCount} = useSelector((state: RootState) => state.ads);
  const dispatch = useAppDispatch();
  const {isLoaded, isClosed, load, show} = useInterstitialAd(adUnitId);
  const [selectStory, setSelectStory] = useState<Story>();

  const {topStories} = useSelector((state: RootState) => state.global);

  useEffect(() => {
    if (interstitialCount % 1 === 0) {
      load();
    }
  }, [interstitialCount, load]);

  useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      dispatch(incrementInitialState());
      navigation.navigate('Story', {
        storyData: selectStory ? selectStory : topStories[0],
      });
    }
  }, [isClosed, navigation, topStories, dispatch, selectStory]);

  const handleStoryClick = (item: Story) => {
    if (isLoaded) {
      setSelectStory(item);
      show();
    } else {
      dispatch(incrementInitialState());
      navigation.navigate('Story', {storyData: item});
    }
  };

  const renderCategory: ListRenderItem<Story> = ({item}) => {
    return (
      <TopStoryCard
        storyData={item}
        onCardClick={() => handleStoryClick(item)}
      />
    );
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
