import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Share from 'react-native-share';
import React from 'react';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';

import {COMMON_STYLES, TYPOGRAPHY} from '../../common/styles/index';

import Markdown from 'react-native-markdown-display';
import {MARKDOWN_STYLES} from '../../utils/constants/markdown.style';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

import Back from '../../components/Back';
import {NavigationAsProps} from '../../utils/types';
import {useAppDispatch} from '../../utils/hooks/index';
import {toggleStoryToBookmark} from '../../redux/slices/global.slice';
import {
  BOOKMARK_ICON,
  BOOKSMARK_ICON_FILLED,
  SHARE_ICON,
} from '../../../assets/icons';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {APP_PLAY_STORE_LINK} from '../../utils/constants';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-4599375922819673~5852311459';

const Story = (props: Props) => {
  const {navigation, route} = props;

  const {bookmarkedStories} = useSelector((state: RootState) => state.global);

  const {storyData} = route.params;

  const dispatch = useAppDispatch();

  const shareStory = async () => {
    const message = `Discover the magic of DreamyTales! ✨ I'm loving this captivating story ${storyData.title} and couldn't resist sharing. Click the link, explore, and let your imagination soar: ${APP_PLAY_STORE_LINK} 📚🚀`;

    const shareOptions = {
      message,
      title: storyData.title,
    };

    Share.open(shareOptions);
  };

  const getBookmarkIcon = () => {
    if (!bookmarkedStories.some(bookmark => bookmark.id === storyData.id)) {
      return BOOKMARK_ICON;
    }
    return BOOKSMARK_ICON_FILLED;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.wrapper}
        contentInsetAdjustmentBehavior="automatic"
        stickyHeaderIndices={[2]}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            ...styles.iconWrapper,
            ...COMMON_STYLES.center,
            ...styles.backIcon,
          }}>
          <Back navigation={navigation} />
        </View>
        <Image
          source={{
            uri: storyData.thumbnail,
          }}
          style={styles.banner}
        />

        <View style={styles.infoWrapper}>
          <Text style={{...TYPOGRAPHY.heading, ...styles.title}}>
            {storyData.title}
          </Text>
          <View style={styles.actions}>
            {/* <ListenStoryButton
              onPress={() => navigation.navigate('Audio Player')}
            /> */}
            <View style={styles.buttons}>
              <TouchableOpacity
                style={{...styles.iconWrapper, ...COMMON_STYLES.center}}
                onPress={() => dispatch(toggleStoryToBookmark(storyData))}>
                <Image source={getBookmarkIcon()} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.iconWrapper, ...COMMON_STYLES.center}}
                onPress={shareStory}>
                <Image source={SHARE_ICON} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Markdown style={MARKDOWN_STYLES}>{storyData.storyContent}</Markdown>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

type Props = NavigationAsProps;

export default Story;

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 100,
    height: 36,
    width: 36,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: COLOURS.BLACK,
  },
  buttons: {
    flexDirection: 'row',
    gap: SPACING.SMALL,
  },
  banner: {
    resizeMode: 'cover',
    height: 300,
    borderBottomRightRadius: BORDER_RADIUS.X_X_LARGE,
    borderBottomLeftRadius: BORDER_RADIUS.X_X_LARGE,
  },
  wrapper: {
    backgroundColor: COLOURS.BACKGROUND,
    paddingBottom: SPACING.LARGE,
    borderBottomRightRadius: BORDER_RADIUS.X_X_LARGE,
    borderBottomLeftRadius: BORDER_RADIUS.X_X_LARGE,
    position: 'relative',
  },
  container: {
    backgroundColor: COLOURS.WHITE,
    flex: 1,
  },
  iconWrapper: {
    backgroundColor: COLOURS.WHITE,
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.X_X_LARGE,
  },
  title: {
    color: COLOURS.BLACK,
  },
  infoWrapper: {
    padding: SPACING.MEDIUM,
    justifyContent: 'center',
    backgroundColor: COLOURS.BACKGROUND,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.MEDIUM,
  },
});
