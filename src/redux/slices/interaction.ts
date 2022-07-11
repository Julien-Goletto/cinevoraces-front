import type { RootState } from 'redux/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  reviews: false,
  viewed : false,
  rating : false,
  bookmarked : false,
  liked : false,
};

const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    setActive(state, action) {
      state.viewed = action.payload.viewed;
      state.rating = action.payload.rating === null ? false: action.payload.rating;
      state.bookmarked = action.payload.bookmarked;
      state.liked = action.payload.liked;
      state.reviews = true;
    },
    setRating(state,action) {
      state.rating = action.payload.rating;
    },
    setInactive() {
      return initialState;
    },
    toggle(state, action) {
      switch(action.payload) {
      case 'viewed':
        state.viewed = !state.viewed;
        break;
      case 'liked':
        state.liked = !state.liked;
        break;
      case 'bookmarked':
        state.bookmarked = !state.bookmarked;
        break;
      case 'rating':
        state.rating = !state.rating;
        break;
      default: 
        break;
      }}
  }});

export const userInteractions = (state: RootState) => state.interaction;
export const { 
  setInactive,
  setActive,
  setRating,
  toggle 
} = interactionSlice.actions;
export default interactionSlice.reducer;