import {Category, Story} from '../../utils/types';

export type GlobalInitialState = {
  isLoading: boolean;
  isError: boolean;
  allCategories: Category[];
  topStories: Story[];
  bookmarkedStories: Story[];
  appConfig: {
    forceUpdateVersion: number;
    homeBannerUrl: string;
    currentAppVersion: number;
  };
  allStories: Story[];
};
