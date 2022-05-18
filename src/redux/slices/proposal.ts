import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = { 
  episode_selected: null,
  episode_publish_date: null,
  searchMovie: '',
  controlledInput: '',
  movie_selected: {
    french_title: null,
    original_title: null,
    poster_url: null,
    directors: null,
    release_date: null,
    runtime: null,
    casting: null,
    presentation: null,
    publishing_date: null,
    user_id: null,
    season_id: null,
    movie_genres: null,
    movie_languages: null,
    movie_countries: null
  }
};


const proposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    setEpisode(state, action) {
      state.episode_selected = action.payload.episode_selected;
      state.episode_publish_date = action.payload.episode_publish_date;
    },
    setSearch(state, action) {
      state.searchMovie = action.payload;
    },
    setInputValue(state, action) {
      state.controlledInput = action.payload;
    },
    setDescription(state, action) {
      state.movie_selected.presentation = action.payload;
    },
    setSelectedMovie(state, action) {
      state.movie_selected = action.payload;
    }
  }
});

export const getEpisode = (state: RootState) => state.proposal.episode_selected;
export const getSearch = (state: RootState) => state.proposal.searchMovie;
export const getInputValue = (state: RootState) => state.proposal.controlledInput;
export const getDescription = (state: RootState) => state.proposal.movie_selected.presentation;
export const getSelectedMovie = (state: RootState) => state.proposal.movie_selected;
export const getProposalData = (state: RootState) => {
  const data = {
    ...state.proposal.movie_selected,
    presentation: state.proposal.movie_selected.presentation,
    user_id: state.user.id
  };
  return data;
};

export const { setEpisode, setSearch, setDescription, setSelectedMovie, setInputValue } = proposalSlice.actions;
export default proposalSlice.reducer;