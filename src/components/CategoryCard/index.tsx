import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Category} from '../../utils/types';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';
import {TYPOGRAPHY} from '../../common/styles';

const CategoryCard = (props: Props) => {
  const {
    category,
    navigation,
    wrapperStyle,
    bannerStyle = {height: 150, width: 125},
  } = props;

  return (
    <TouchableOpacity
      style={{...styles.wrapper, ...wrapperStyle}}
      onPress={() => navigation.navigate('Category', {categoryData: category})}>
      <Image
        source={{uri: category.thumbnail}}
        style={{...styles.banner, ...bannerStyle}}
      />
      <View style={styles.titleContainer}>
        <Text style={{...TYPOGRAPHY.text, ...styles.title}}>
          {category.categoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

type Props = {
  category: Category;
  navigation: any;
  wrapperStyle: any;
  bannerStyle?: any;
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: SPACING.SMALL,
    backgroundColor: COLOURS.SECONDARY,
    borderRadius: BORDER_RADIUS.MEDIUM,
  },
  banner: {
    borderRadius: BORDER_RADIUS.MEDIUM,
    resizeMode: 'cover',
  },
  title: {
    bottom: 0,
    color: COLOURS.BLACK,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.X_SMALL,
  },
});
