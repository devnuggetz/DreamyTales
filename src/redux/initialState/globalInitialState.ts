import {GlobalInitialState} from '../types';

export const globalInitialState: GlobalInitialState = {
  allCategories: [],
  bookmarkedStories: [],
  topStories: [],
  isLoading: false,
  isError: false,
  appConfig: {
    homeBannerUrl:
      'https://cdn.midjourney.com/cf8d133a-3feb-43d0-a649-f79b80de7ea3/grid_0.png',
    forceUpdateVersion: 0,
    currentAppVersion: 0,
  },
  allStories: [],
};
