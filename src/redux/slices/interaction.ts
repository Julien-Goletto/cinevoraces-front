import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = { 
  isView : false,
  isStar : false,
  isBookmark : false,
  isLike : false,
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
        state.isStar = !state.isStar;
        break;
      default: 
        break;
      }
    }
  }
});

export const isActive = (state: RootState) => state.interaction.isLike;

export const { setInactive, setActive, toggle } = interactionSlice.actions;
export default interactionSlice.reducer;