import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type GlobalState = {
  modalIsOpen: boolean,
  toasts: { 
    type: 'error' | 'warn' | 'success',
    text: string,
    duration?: number,
    id?: number
  }[],
};

const initialState : GlobalState = { 
  modalIsOpen: false,
  toasts: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleModal(state) {
      state.modalIsOpen = !state.modalIsOpen;
    },
    addToast(state, action) {
      state.toasts.push(action.payload);
    },
    removeToast(state) {
      state.toasts.splice(0, 1);
    }}
});

export const globalState = (state: RootState) => state.global;

export const { 
  toggleModal,
  addToast,
  removeToast } = globalSlice.actions;
export default globalSlice.reducer;