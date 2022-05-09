import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = { 
  value: 0,
  connectionIsOpen: false
};


const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleConnection(state) {
      state.connectionIsOpen = !state.connectionIsOpen;
    },
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    }
  }
});

export const getCount = (state: RootState) => state.global.value;

export const { increment, decrement, toggleConnection } = globalSlice.actions;
export default globalSlice.reducer;