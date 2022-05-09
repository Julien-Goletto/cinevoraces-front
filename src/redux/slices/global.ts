import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = { 
  value: 0,
  mobileIsOpen: false,
  connectionIsOpen: false,
  userIsOpen: false
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
    },
    userIsOpen(state) {
      state.userIsOpen = !state.userIsOpen;
    }
  }
});

export const getCount = (state: RootState) => state.global.value;

export const { increment, decrement, toggleConnection, mobileIsOpen, userIsOpen } = globalSlice.actions;
export default globalSlice.reducer;