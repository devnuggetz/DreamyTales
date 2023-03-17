import firestore from '@react-native-firebase/firestore';
import {chacheDatainAsync, checkIfDataCached, shuffleArray} from '../helper';

export const getInitialGlobalData = async () => {
  const [categoryData, storyData] = await Promise.all([
    getCategoryData(),
    getStoryData(),
  ]);

  const topStories = getTopStories(storyData);

  const formattedCategoriesData = getFormattedCategoryData(
    categoryData,
    storyData,
  );

  console.log(formattedCategoriesData);

  return {
    topStories: shuffleArray(topStories),
    allCategories: shuffleArray(formattedCategoriesData),
    bookmarkedStories: [],
  };
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
