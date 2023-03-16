import {COLOURS, SPACING} from '../../common/theme';

// this is converted to a stylesheet internally at run time with StyleSheet.create(
export const MARKDOWN_STYLES = {
  // The main container
  body: {
    padding: SPACING.MEDIUM,
  },

  // Text Output
  text: {
    color: COLOURS.BLACK,
    fontFamily: 'Recoleta-Regular',
    fontSize: 22,
    lineHeight: 32,
  },
};
