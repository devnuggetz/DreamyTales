import {StyleSheet} from 'react-native';

export const COMMON_STYLES = StyleSheet.create({
  full_flex: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const TYPOGRAPHY = StyleSheet.create({
  heading: {
    fontFamily: 'Recoleta-Medium',
    fontSize: 28,
  },
  subHeading: {
    fontFamily: 'Recoleta-Medium',
    fontSize: 20,
  },
  text: {
    fontFamily: 'Recoleta-Regular',
    fontSize: 16,
  },
  title: {
    fontFamily: 'Recoleta-Regular',
    fontSize: 18,
  },
});
