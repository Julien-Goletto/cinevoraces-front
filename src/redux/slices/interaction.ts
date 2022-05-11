import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = { 
  isView : false,
  isStar : false,
  isBookmark : false,
  isLike : false,
  addNoteMobileIsOpen: false,
  addNoteIsOpen: false,
  addNoteUserIsOpen: false
};


const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    setActive(state) {
    },
    setInactive(state) {
    },
    toggle(state, action) {
      console.log(action.payload);
      
      switch(action.payload) {
      case 'view':
        state.isView = !state.isView;
        break;
      case 'like':
        state.isLike = !state.isLike;
        break;
      case 'bookmark':
        state.isBookmark = !state.isBookmark;
        break;
      case 'star':
        state.addNoteIsOpen = !state.addNoteIsOpen;
        break;
      default: 
        break;
      }
    },
    addNoteMobileIsOpen(state) {
      state.addNoteMobileIsOpen = !state.addNoteMobileIsOpen;
    },
    addNoteUserIsOpen(state) {
      state.addNoteUserIsOpen = !state.addNoteUserIsOpen;
    }
  }
});

export const isActive = (state: RootState) => state.interaction.isLike;
export const addNoteIsOpen = (state: RootState) => state.interaction.addNoteIsOpen;
/*

*/
export const { setInactive, setActive, toggle, addNoteMobileIsOpen, addNoteUserIsOpen } = interactionSlice.actions;
export default interactionSlice.reducer;