import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Category} from '../../utils/types';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';
import {TYPOGRAPHY} from '../../common/styles';

const CategoryCard = (props: Props) => {
  const {category} = props;

  return (
    <View style={styles.wrapper}>
      <Image source={{uri: category.categoryImage}} style={styles.banner} />
      <View style={styles.titleContainer}>
        <Text style={{...TYPOGRAPHY.text, ...styles.title}}>
          {category.categoryName}
        </Text>
      </View>
    </View>
  );
};

export default CategoryCard;

type Props = {
  category: Category;
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: SPACING.SMALL,
    backgroundColor: COLOURS.SECONDARY,
    borderRadius: BORDER_RADIUS.MEDIUM,
  },
  banner: {
    height: 150,
    width: 125,
    resizeMode: 'cover',
    borderRadius: BORDER_RADIUS.MEDIUM,
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
