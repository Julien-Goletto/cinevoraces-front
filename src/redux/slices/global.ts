import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = { 
  value: 0,
  mobileIsOpen: false,
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
    },
    mobileIsOpen(state) {
      state.mobileIsOpen = !state.mobileIsOpen;
      console.log('caca');
      
    }
  }
});

export const getCount = (state: RootState) => state.global.value;

export const { increment, decrement, toggleConnection, mobileIsOpen } = globalSlice.actions;
export default globalSlice.reducer;