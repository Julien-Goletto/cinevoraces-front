import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type GlobalState = {
  mobileIsOpen: boolean,
  modalIsOpen: boolean,
  userIsOpen: boolean,
  toasts: object[],
}

const initialState : GlobalState = { 
  mobileIsOpen: false,
  modalIsOpen: false,
  userIsOpen: false,
  toasts: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleModal(state) {
      state.modalIsOpen = !state.modalIsOpen;
    },
    addToast(state, action:Toast) {
      action.payload.id = Math.floor((Math.random() * 9999) + 1);
      state.toasts.push(action.payload);
    },
    removeToast(state, action:any) {
      state.toasts = state.toasts.filter((el:any) => action.payload !== el.id);
    }}
});

export const getToasts = (state: RootState) => state.global.toasts;
export const globalState = (state: RootState) => state.global;

export const { 
  toggleModal,
  addToast,
  removeToast } = globalSlice.actions;
export default globalSlice.reducer;