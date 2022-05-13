import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = { 
  episode_selected: null,
  searchMovie: '',
  movie_selected: {} ,
  description_movie: ''
};


const proposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    setEpisode(state, action) {
      state.episode_selected = action.payload;
    },
    setSearch(state, action) {
      state.searchMovie = action.payload;
    },
    setDescription(state, action) {
      state.description_movie = action.payload;
    },
    setSelectedMovie(state, action) {
      state.movie_selected = action.payload;
    }
  }
});

export const getEpisode = (state: RootState) => state.proposal.episode_selected;
export const getSearch = (state: RootState) => state.proposal.searchMovie;
export const getDescription = (state: RootState) => state.proposal.description_movie;
export const getSelectedMovie = (state: RootState) => state.proposal.movie_selected;
export const getProposalData = (state: RootState) => {
  const data = {
    ...state.proposal.movie_selected,
    episode: state.proposal.episode_selected,
    presentation: state.proposal.description_movie
  };
  return data;
};

export const { setEpisode, setSearch, setDescription, setSelectedMovie } = proposalSlice.actions;
export default proposalSlice.reducer;