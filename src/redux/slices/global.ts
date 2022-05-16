import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


const initialState : GlobalState = { 
  mobileIsOpen: false,
  connectionIsOpen: false,
  userIsOpen: false,
  toasts: [],
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
    },
    addToast(state, action:Toast) {
      action.payload.id = Math.floor((Math.random() * 9999) + 1);
      state.toasts.push(action.payload);
    },
    removeToast(state, action:any) {
      state.toasts = state.toasts.filter((el:any) => action.payload.id === el.id);
    }
  }
});

export const getToasts = (state: RootState) => state.global.toasts;

export const { toggleConnection, mobileIsOpen, userIsOpen, addToast, removeToast } = globalSlice.actions;
export default globalSlice.reducer;