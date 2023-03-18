import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import adsSlice from '../slices/ads.slice';
import globalSlice from '../slices/global.slice';

const store = configureStore({
  reducer: {
    global: globalSlice,
    ads: adsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
