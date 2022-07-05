import type { RootState } from 'redux/store';
import { createSlice } from '@reduxjs/toolkit';

type proposalState = {
  episode_selected: string,
  episode_publish_date: string,
  searchMovie: string,
  controlledInput: string,
  presentation: string,
  season_id: string,
  movie_selected: {[key: string]: string},
}

const initialState: proposalState = { 
  episode_selected: '',
  episode_publish_date: '',
  searchMovie: '',
  controlledInput: '',
  presentation: '',
  season_id: '',
  movie_selected: {}
};


const proposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    setEpisode(state, action) {
      state.episode_selected = action.payload.episode_selected;
      state.episode_publish_date = action.payload.episode_publish_date;
      state.season_id = action.payload.season_id;
    },
    unsetEpisode(state) {
      state.episode_selected = '';
      state.episode_publish_date = '';
      state.season_id = '';
    },
    setSearch(state, action) {
      state.searchMovie = action.payload;
    },
    setInputValue(state, action) {
      state.controlledInput = action.payload;
    },
    setDescription(state, action) {
      state.presentation = action.payload;
    },
    setSelectedMovie(state, action) {
      state.movie_selected = action.payload;
    }
  }});

export const getEpisode = (state: RootState) => state.proposal.episode_selected;
export const getSearch = (state: RootState) => state.proposal.searchMovie;
export const getInputValue = (state: RootState) => state.proposal.controlledInput;
export const getDescription = (state: RootState) => state.proposal.presentation;
export const getSelectedMovie = (state: RootState) => state.proposal.movie_selected;
export const getProposalData = (state: RootState) => {
  const data = {
    ...state.proposal.movie_selected,
    publishing_date: state.proposal.episode_publish_date,
    presentation: state.proposal.presentation,
    user_id: state.user.id,
    season_id: state.proposal.season_id
  };
  return data;
};

export const { setEpisode, unsetEpisode, setSearch, setDescription, setSelectedMovie, setInputValue } = proposalSlice.actions;
export default proposalSlice.reducer;