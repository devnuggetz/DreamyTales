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
import {Category, Story} from '../../utils/types';
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
import CategoryCard from '../../components/CategoryCard';
import Layout from '../../common/Layout';

const AllCategories = ({navigation}) => {
  const {allCategories} = useSelector((state: RootState) => state.global);

  const renderCategory: ListRenderItem<Category> = ({item}) => {
    return (
      <CategoryCard
        category={item}
        navigation={navigation}
        wrapperStyle={{width: '46%'}}
        bannerStyle={{width: '100%', height: 150}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.searchWrapper}>
        <Search allowSearch={false} navigation={navigation} />
      </View>
      <Text style={{...TYPOGRAPHY.subHeading, ...styles.heading}}>
        Discover Your Next Adventure
      </Text>
      <FlatList
        data={allCategories}
        renderItem={renderCategory}
        ItemSeparatorComponent={() => <View style={{height: 16}} />}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  categoriesWrapper: {
    paddingBottom: SPACING.X_X_LARGE,
    position: 'relative',
  },

  wrapper: {
    flex: 1,
    paddingBottom: SPACING.X_X_LARGE,
    backgroundColor: COLOURS.BACKGROUND,
    paddingHorizontal: SPACING.SMALL,
  },

  searchWrapper: {
    backgroundColor: COLOURS.BACKGROUND,
  },
  columnWrapper: {
    justifyContent: 'space-around',
  },
  heading: {
    color: COLOURS.BLACK,
    paddingBottom: SPACING.X_LARGE,
  },
});
