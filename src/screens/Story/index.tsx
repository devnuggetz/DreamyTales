import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {BORDER_RADIUS, COLOURS, SPACING} from '../../common/theme';

import Bookmarks from '../../components/Bookmarks';
import {COMMON_STYLES, TYPOGRAPHY} from '../../common/styles/index';
import ListenStoryButton from '../../components/ListenStoryButton';

const Story = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <Image
          source={{
            uri: 'https://cdn.midjourney.com/5955c29c-36b0-4a50-ac6e-d1e0735d0a34/grid_0.png',
          }}
          style={styles.banner}
        />
        <View style={styles.infoWrapper}>
          <Text style={{...TYPOGRAPHY.heading, ...styles.title}}>
            Alice in Wonderland Playing Gamess
          </Text>
          <View style={styles.actions}>
            <ListenStoryButton />
            <View style={{...styles.bookmarks, ...COMMON_STYLES.center}}>
              <Bookmarks navigation={() => console.log('')} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Story;

const styles = StyleSheet.create({
  banner: {
    resizeMode: 'cover',
    height: 300,
    borderBottomRightRadius: BORDER_RADIUS.X_X_LARGE,
    borderBottomLeftRadius: BORDER_RADIUS.X_X_LARGE,
  },
  wrapper: {
    backgroundColor: COLOURS.BACKGROUND,
    paddingBottom: SPACING.LARGE,
    borderBottomRightRadius: BORDER_RADIUS.X_X_LARGE,
    borderBottomLeftRadius: BORDER_RADIUS.X_X_LARGE,
  },
  container: {
    backgroundColor: COLOURS.WHITE,
    flex: 1,
  },
  bookmarks: {
    backgroundColor: COLOURS.WHITE,
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.X_X_LARGE,
  },
  title: {
    color: COLOURS.BLACK,
  },
  infoWrapper: {
    padding: SPACING.MEDIUM,
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
