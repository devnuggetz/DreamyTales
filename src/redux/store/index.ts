import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import globalSlice from '../slices/global.slice';

const store = configureStore({
  reducer: {
    global: globalSlice,
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
