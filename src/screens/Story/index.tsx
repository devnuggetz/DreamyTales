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

const copy = `Once upon a time, there was a curious little girl named Alice. One sunny afternoon, while she was lounging in the garden, she saw a rabbit wearing a waistcoat and a pocket watch scurrying by.

Without a second thought, Alice followed the rabbit into a rabbit hole, and soon found herself tumbling down into a strange and fantastical world. She landed in a room filled with doors, and after much confusion, she finally found the key to a tiny door that led her into a beautiful garden.

There, she met a talking mouse, a caterpillar that smoked a hookah, and a grinning Cheshire cat. She played a game of croquet with the Queen of Hearts and her subjects, and even attended a mad tea party with the Hatter and the March Hare.

But as the day wore on, Alice grew tired of the nonsensical and chaotic world she had found herself in. She longed to return home, but she didn't know how.


Finally, Alice woke up in her own bed, realizing that it had all been a dream. She smiled to herself, knowing that even though it was just a dream, it was still a wonderful adventure.

And so, with a heart full of wonder and joy, Alice drifted off to sleep, dreaming of the magical world she had discovered and the adventures that awaited her in the future.`;

const Story = (props: Props) => {
  const {navigation} = props;

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
            uri: 'https://cdn.midjourney.com/5955c29c-36b0-4a50-ac6e-d1e0735d0a34/grid_0.png',
          }}
          style={styles.banner}
        />

        <View style={styles.infoWrapper}>
          <Text style={{...TYPOGRAPHY.heading, ...styles.title}}>
            Alice in Wonderland Playing Gamess
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
        <Markdown style={MARKDOWN_STYLES}>{copy}</Markdown>
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
