import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = { value: 0 };


const counterSlice = createSlice({
  name: 'counter',
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

export const getCount = (state: RootState) => state.counter.value;

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;