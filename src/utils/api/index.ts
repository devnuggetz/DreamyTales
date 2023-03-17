import firestore from '@react-native-firebase/firestore';
import {chacheDatainAsync, checkIfDataCached, shuffleArray} from '../helper';
import RemoteConfig from '@react-native-firebase/remote-config';

export const getInitialGlobalData = async () => {
  const [categoryData, storyData, remoteConfig] = await Promise.all([
    getCategoryData(),
    getStoryData(),
    fetchRemoteData(),
  ]);

  const {
    forceUpdateAvailable,
    homePageConfig: {homeBanner},
  } = remoteConfig;

  const topStories = getTopStories(storyData);

  const formattedCategoriesData = getFormattedCategoryData(
    categoryData,
    storyData,
  );

  return {
    topStories: shuffleArray(topStories),
    allCategories: shuffleArray(formattedCategoriesData),
    bookmarkedStories: [],
    homeBannerUrl: homeBanner,
    forceUpdateAvailable,
  };
};

const fetchRemoteData = async () => {
  const defaultConfig = {
    forceUpdateAvailable: false,
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
  const forceUpdateAvailable = RemoteConfig()
    .getValue('forceUpdateAvailable')
    .asBoolean();
  const homePageConfig = JSON.parse(
    RemoteConfig().getValue('homePageConfig').asString(),
  );

  return {forceUpdateAvailable, homePageConfig};
};

const getFormattedCategoryData = (categoryData, storyData) => {
  return categoryData.map(category => {
    return {
      ...category,
      stories: getStoriesByCategory(category.categoryName, storyData),
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
      console.log('Total users: ', querySnapshot.size);

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
    console.log('cached story data');
    return cachedStoryData;
  }

  console.log('Article called');
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
