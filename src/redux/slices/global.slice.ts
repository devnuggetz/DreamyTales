import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getInitialGlobalData} from '../../utils/api';
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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initialDataFetch.pending, state => {
        console.log('HERE');
        state.isLoading = true;
      })
      .addCase(initialDataFetch.fulfilled, (state, action: any) => {
        console.log('HERE', 2);
        state.isLoading = false;
        state.allCategories = action.payload.allCategories;
        state.bookmarkedStories = action.payload.bookmarkedStories;
        state.topStories = action.payload.topStories;
        state.appConfig = {
          homeBannerUrl: action.payload.homeBannerUrl,
          isForceUpdateAvailable: action.payload.forceUpdateAvailable,
        };
      })
      .addCase(initialDataFetch.rejected, state => {
        console.log('HERE', 5);
        state.isError = true;
      });
  },
});

export default globalSlice.reducer;
