import {Category, Story} from '../../utils/types';

export type GlobalInitialState = {
  isLoading: boolean;
  isError: boolean;
  allCategories: Category[];
  topStories: Story[];
  bookmarkedStories: Story[];
};
