import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TYPOGRAPHY} from '../../../common/styles';
import CategoryCard from '../../../components/CategoryCard';
import {Category} from '../../../utils/types';
import {COLOURS, SPACING} from '../../../common/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

const Categories = (props: Props) => {
  const {allCategories} = useSelector((state: RootState) => state.global);
  const {navigation} = props;

  const renderCategory: ListRenderItem<Category> = ({item}) => {
    return <CategoryCard category={item} navigation={navigation} />;
  };

  return (
    <View>
      <Text style={styles.heading}>Categories</Text>
      <FlatList
        data={allCategories}
        renderItem={renderCategory}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{width: 12}} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
type Props = {
  navigation: any;
};
export default Categories;

const styles = StyleSheet.create({
  heading: {
    ...TYPOGRAPHY.subHeading,
    marginVertical: SPACING.MEDIUM,
    color: COLOURS.BLACK,
  },
});
