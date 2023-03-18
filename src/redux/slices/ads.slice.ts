import {createSlice} from '@reduxjs/toolkit';

import {adsInitialState} from '../initialState/adsInitialState';

const adsSlice = createSlice({
  name: 'ads',
  initialState: adsInitialState,
  reducers: {
    incrementInitialState: state => {
      state.interstitialCount++;
    },
  },
});

export const {incrementInitialState} = adsSlice.actions;

export default adsSlice.reducer;
