import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';
import {COMMON_STYLES, TYPOGRAPHY} from '../../common/styles';
import Search from '../../components/Search';
import Categories from './Categories';
import TopStories from './TopStories';
import Bookmarks from '../../components/Bookmarks';
import Layout from '../../common/Layout';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {initialDataFetch} from '../../redux/slices/global.slice';
import {useAppDispatch} from '../../utils/hooks';

const Home = ({navigation}: Props) => {
  const {allCategories, bookmarkedStories, topStories} = useSelector(
    (state: RootState) => state.global,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allCategories.length <= 0) {
      test();
    }
  }, []);

  const test = () => {
    dispatch(initialDataFetch());
  };
  return (
    <Layout>
      <View style={{...COMMON_STYLES.full_flex, ...styles.wrapper}}>
        <View>
          <View style={styles.topSection}>
            <View style={{...styles.headingContainer}}>
              <Text style={{...styles.heading}}>DreamyTales</Text>
              <Text style={{...TYPOGRAPHY.subHeading}}>
                What will you listen today?
              </Text>
            </View>
            <Bookmarks navigation={navigation} />
          </View>
          <Image
            source={{
              uri: 'https://cdni.iconscout.com/illustration/premium/thumb/boy-watching-through-telescope-5982672-4972891.png',
            }}
            style={styles.banner}
          />
          <Search allowSearch={false} navigation={navigation} />
          <Categories navigation={navigation} />
          <TopStories navigation={navigation} />
        </View>
      </View>
    </Layout>
  );
};

type Props = {
  navigation: any;
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
    paddingBottom: SPACING.X_X_LARGE,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
