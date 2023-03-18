import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {TYPOGRAPHY} from '../../../common/styles';
import CategoryCard from '../../../components/CategoryCard';
import {Category} from '../../../utils/types';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../../common/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

const Categories = (props: Props) => {
  const {allCategories} = useSelector((state: RootState) => state.global);
  const {navigation} = props;

  const renderCategory: ListRenderItem<Category> = ({item}) => {
    return (
      <CategoryCard category={item} navigation={navigation} wrapperStyle={{}} />
    );
  };

  return (
    <View>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Categories</Text>
        <TouchableOpacity
          style={styles.exploreWrapper}
          onPress={() => navigation.navigate('All Categories')}>
          <Text style={{...TYPOGRAPHY.text, color: COLOURS.BLACK}}>
            Explore
          </Text>
        </TouchableOpacity>
      </View>
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
  exploreWrapper: {
    borderRadius: BORDER_RADIUS.X_X_LARGE,
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.SECONDARY,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
