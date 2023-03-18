import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getInitialGlobalData} from '../../utils/api';
import {toggleStoryToBookmarks} from '../../utils/helper';
import {Story} from '../../utils/types';
import {globalInitialState} from '../initialState/globalInitialState';

export const initialDataFetch = createAsyncThunk(
  'global/getInitialGlobalData',
  async () => {
    const data = await getInitialGlobalData();
    // The value we return becomes the `fulfilled` action payload
    return data;
  },
);

const globalSlice = createSlice({
  name: 'global',
  initialState: globalInitialState,
  reducers: {
    toggleStoryToBookmark: (state, action: PayloadAction<Story>) => {
      const story = action.payload;
      toggleStoryToBookmarks(story);

      const storyIndex = state.bookmarkedStories.findIndex(
        bookmark => bookmark.id === story.id,
      );

      if (storyIndex !== -1) {
        // Remove the story from bookmarks
        state.bookmarkedStories.splice(storyIndex, 1);
      } else {
        // Add the story to bookmarks
        state.bookmarkedStories.push(story);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initialDataFetch.pending, state => {
        state.isLoading = true;
      })
      .addCase(initialDataFetch.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.allCategories = action.payload.allCategories;
        state.bookmarkedStories = action.payload.bookmarkedStories;
        state.topStories = action.payload.topStories;
        state.allStories = action.payload.allStories;
        state.appConfig = {
          homeBannerUrl: action.payload.homeBannerUrl,
          forceUpdateVersion: action.payload.forceUpdateVersion,
          currentAppVersion: action.payload.currentAppVersion,
        };
      })
      .addCase(initialDataFetch.rejected, state => {
        state.isError = true;
      });
  },
});

export const {toggleStoryToBookmark} = globalSlice.actions;

export default globalSlice.reducer;
