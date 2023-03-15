import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLOURS, SPACING} from '../theme';
import {COMMON_STYLES} from '../styles/index';

const Layout = (props: any) => {
  const {children} = props;

  return (
    <SafeAreaView style={{...COMMON_STYLES.full_flex}}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.BACKGROUND,
    width: '100%',
    paddingHorizontal: SPACING.LARGE,
    paddingTop: SPACING.MEDIUM,
    flex: 1,
  },
});
