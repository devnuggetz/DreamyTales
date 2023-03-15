import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';
import {COMMON_STYLES, TYPOGRAPHY} from '../../common/styles';
import Search from '../../components/Search';
import Categories from './Categories';
import {BannerAdSize, TestIds, BannerAd} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-4599375922819673/2391578594';

const Home = () => {
  return (
    <View style={{...COMMON_STYLES.full_flex, ...styles.wrapper}}>
      <View>
        <View style={{...styles.headingContainer}}>
          <Text style={{...styles.heading}}>DreamyTales</Text>
          <Text style={{...TYPOGRAPHY.subHeading}}>
            What will you listen today?
          </Text>
        </View>
        <Image
          source={{
            uri: 'https://cdni.iconscout.com/illustration/premium/thumb/boy-watching-through-telescope-5982672-4972891.png',
          }}
          style={styles.banner}
        />
        <Search />
        <Categories />
      </View>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    color: COLOURS.BLACK,
    ...TYPOGRAPHY.heading,
  },
  banner: {
    height: 180,
    borderRadius: BORDER_RADIUS.MEDIUM,
    resizeMode: 'contain',
  },
  headingContainer: {
    marginBottom: SPACING.MEDIUM,
  },
  wrapper: {
    justifyContent: 'space-between',
  },
});
