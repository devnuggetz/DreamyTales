import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';
import {TYPOGRAPHY} from '../../common/styles';
import {SEARCH_ICON} from '../../../assets/icons';
import {NavigationAsProps} from '../../utils/types';

const Search = (props: Props) => {
  const {allowSearch, navigation} = props;

  return (
    <View style={styles.wrapper}>
      <Image source={SEARCH_ICON} style={styles.search_icon} />

      {allowSearch ? (
        <TextInput style={styles.input} placeholder="Search your story" />
      ) : (
        <Text
          style={styles.placeholderText}
          onPress={() => navigation.navigate('Explore')}>
          Search your story
        </Text>
      )}
    </View>
  );
};

type Props = {
  allowSearch?: boolean;
} & NavigationAsProps;

export default Search;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLOURS.WHITE,
    marginVertical: SPACING.MEDIUM,
    borderRadius: BORDER_RADIUS.MEDIUM,
    paddingHorizontal: SPACING.SMALL,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'scroll',
  },
  input: {
    ...TYPOGRAPHY.text,
    overflow: 'scroll',
    width: '90%',
  },
  search_icon: {
    height: 18,
    width: 18,
    marginRight: SPACING.X_SMALL,
  },
  placeholderText: {
    ...TYPOGRAPHY.text,
    overflow: 'scroll',
    width: '90%',
    paddingVertical: SPACING.MEDIUM,
  },
});
