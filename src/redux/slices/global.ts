import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
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
    mobileIsOpen(state) {
      state.mobileIsOpen = !state.mobileIsOpen;
    },
    userIsOpen(state) {
      state.userIsOpen = !state.userIsOpen;
    }
  }
});

export const { toggleConnection, mobileIsOpen, userIsOpen } = globalSlice.actions;
export default globalSlice.reducer;