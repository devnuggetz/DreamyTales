import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TYPOGRAPHY} from '../../../common/styles';
import {DATA} from '../../../data';
import CategoryCard from '../../../components/CategoryCard';
import {Category} from '../../../utils/types';
import {COLOURS, SPACING} from '../../../common/theme';

const Categories = () => {
  const renderCategory: ListRenderItem<Category> = ({item}) => {
    return <CategoryCard category={item} />;
  };

  return (
    <View>
      <Text style={styles.heading}>Categories</Text>
      <FlatList
        data={DATA}
        renderItem={renderCategory}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{width: 12}} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  heading: {
    ...TYPOGRAPHY.subHeading,
    marginVertical: SPACING.MEDIUM,
    color: COLOURS.BLACK,
  },
});
