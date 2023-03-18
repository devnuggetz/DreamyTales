import firestore from '@react-native-firebase/firestore';
import {chacheDatainAsync, checkIfDataCached, shuffleArray} from '../helper';
import RemoteConfig from '@react-native-firebase/remote-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Story} from '../types';

export const getInitialGlobalData = async () => {
  const [categoryData, storyData, remoteConfig, bookmarkedStories] =
    await Promise.all([
      getCategoryData(),
      getStoryData(),
      fetchRemoteData(),
      getBookmarkedStories(),
    ]);

  const {
    forceUpdateVersion,
    homePageConfig: {homeBanner},
    currentAppVersion,
  } = remoteConfig;

  const topStories = getTopStories(storyData);

  const formattedCategoriesData = getFormattedCategoryData(
    categoryData,
    storyData,
  );

  return {
    topStories: shuffleArray(topStories),
    allCategories: shuffleArray(formattedCategoriesData),
    bookmarkedStories: bookmarkedStories,
    homeBannerUrl: homeBanner,
    forceUpdateVersion,
    currentAppVersion,
    allStories: shuffleArray(storyData),
  };
};

const getBookmarkedStories = async () => {
  try {
    const bookmarksKey = 'bookmarks';
    const storedData = await AsyncStorage.getItem(bookmarksKey);
    let bookMarks: Story[] = storedData ? JSON.parse(storedData) : [];

    return bookMarks;
  } catch (error) {
    console.error('Error adding story to bookmarks:', error);
    return [];
  }
};

const fetchRemoteData = async () => {
  const defaultConfig = {
    forceUpdateVersion: 0,
    currentAppVersion: 0,
    homePageConfig: {
      homeBanner: JSON.stringify({
        homeBanner:
          'https://cdn.midjourney.com/cf8d133a-3feb-43d0-a649-f79b80de7ea3/grid_0.png',
      }),
    },
  };

  await RemoteConfig().setDefaults(defaultConfig);

  // Fetch and activate the remote config data
  await RemoteConfig().fetchAndActivate();

  // Access the values
  const forceUpdateVersion = RemoteConfig()
    .getValue('forceUpdateVersion')
    .asNumber();
  const currentAppVersion = RemoteConfig()
    .getValue('currentAppVersion')
    .asNumber();
  const homePageConfig = JSON.parse(
    RemoteConfig().getValue('homePageConfig').asString(),
  );

  return {forceUpdateVersion, homePageConfig, currentAppVersion};
};

const getFormattedCategoryData = (categoryData, storyData) => {
  return categoryData.map(category => {
    return {
      ...category,
      stories: shuffleArray(
        getStoriesByCategory(category.categoryName, storyData),
      ),
    };
  });
};

const getStoriesByCategory = (categoryName, storyData) => {
  return storyData.filter(story => story.categories.includes(categoryName));
};

const getTopStories = stories => {
  return stories.filter(story => story.topStory === 'true');
};

const getCategoryData = async () => {
  const cachedCategoryData = await checkIfDataCached('allCategories');

  if (cachedCategoryData) {
    return cachedCategoryData;
  }

  const category: any[] = [];
  await firestore()
    .collection('Category')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const _cat = {
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        };
        category.push(_cat);
      });
    });

  await chacheDatainAsync('allCategories', category);

  return category;
};

const getStoryData = async () => {
  const cachedStoryData = await checkIfDataCached('allStories');

  if (cachedStoryData) {
    return cachedStoryData;
  }

  const story: any[] = [];
  await firestore()
    .collection('Story')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);

      querySnapshot.forEach(documentSnapshot => {
        const _story = {
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        };
        story.push(_story);
      });
    });

  await chacheDatainAsync('allStories', story);
  return story;
};
