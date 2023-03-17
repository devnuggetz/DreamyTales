import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';

import Bookmarks from '../../components/Bookmarks';
import {COMMON_STYLES, TYPOGRAPHY} from '../../common/styles/index';
import ListenStoryButton from '../../components/ListenStoryButton';

import Markdown from 'react-native-markdown-display';
import {MARKDOWN_STYLES} from '../../utils/constants/markdown.style';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import Share from '../../components/Share';
import Back from '../../components/Back';
import {NavigationAsProps} from '../../utils/types';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-4599375922819673~5852311459';

const Story = (props: Props) => {
  const {navigation, route} = props;

  const {storyData} = route.params;

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
            <ListenStoryButton
              onPress={() => navigation.navigate('Audio Player')}
            />
            <View style={styles.buttons}>
              <View style={{...styles.iconWrapper, ...COMMON_STYLES.center}}>
                <Bookmarks navigation={() => console.log('')} />
              </View>
              <View style={{...styles.iconWrapper, ...COMMON_STYLES.center}}>
                <Share navigation={() => console.log('')} />
              </View>
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
  },
});
