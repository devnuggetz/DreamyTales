import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';
import {TYPOGRAPHY} from '../../common/styles';
import Search from '../../components/Search';
import Categories from './Categories';

const Home = () => {
  return (
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
});
