import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = { value: 0 };


const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    }
  }
});

export const getCount = (state: RootState) => state.global.value;

export const { increment, decrement } = globalSlice.actions;
export default globalSlice.reducer;