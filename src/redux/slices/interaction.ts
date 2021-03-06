import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
      state.viewed = action.payload[0].viewed;
      state.rating = action.payload[0].rating === null ? false: action.payload[0].rating;
      state.bookmarked = action.payload[0].bookmarked;
      state.liked = action.payload[0].liked;
      state.reviews = true;
    },
    setRating(state,action) {
      state.rating = action.payload.rating;
    },
    setInactive(state) {
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
      }
    }
  }
});



export const isReviews = (state: RootState) => state.interaction.reviews;
export const interaction = (state: RootState) => state.interaction;
export const getRating = (state: RootState) => state.interaction.rating;

export const { setInactive, setActive, setRating, toggle } = interactionSlice.actions;
export default interactionSlice.reducer;