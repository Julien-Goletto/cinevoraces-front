import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: FilterState = { 
  seasons: [],
  isViewed: [
    {name: 'Tous', value: 'all', isChecked: true},
    {name: 'Vus', value: 'viewed', isChecked: false},
    {name: 'À voir', value: 'not-viewed', isChecked: false},
  ],
  tags: [],
  periode: {baseValues: [1900, 2077], stateValues: [1900, 2077]},
  query: '',
  isDefault: true,
  filterState: {
    season_number: 'all',
    genres: [],
    countries: []
  }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    initFilters(state, action) {
      const {periode, seasons, tags} = action.payload;
      state.periode = periode;
      state.tags = tags;
      state.seasons = seasons;
      state.filterState.season_number = seasons[0].value;
    },
    resetAllFilters(state) {
      state.seasons.forEach((el, i) => {
        (i === 0) ? el.isChecked = true : el.isChecked = false;
      });
      state.isViewed.forEach((el, i) => {
        (i === 0) ? el.isChecked = true : el.isChecked = false;
      });
      state.tags.forEach((el) => {
        el.tags.forEach((el) => {
          el.isChecked = false;
        });
      });
      state.isDefault = true;
    },
    setSeasonFilter(state, action) {
      state.seasons.forEach((el) => {
        
        if (el.value === action.payload) {
          el.isChecked = true;
          state.filterState.season_number = el.value === 'all' ? 'all' : Number(el.value);
        } else {
          el.isChecked = false;
        }
      });
      state.isDefault = false;
    },
    setIsViewedFilter(state, action) {
      state.isViewed.forEach((el) => {
        (el.value === action.payload) ? el.isChecked = true : el.isChecked = false;
      });
      state.isDefault = false;
    },
    setTagFilter(state, action) {
      state.tags.forEach((el) => {
        if (el.tagName === action.payload.tagName) {
          el.tags.forEach((el) => {
            if (el.name === action.payload.tag) {
              el.isChecked = !el.isChecked;
              switch (action.payload.tagName) {
              case 'Genres':
                if (el.isChecked) {
                  state.filterState.genres.push(el.name);
                } else {
                  let i = state.filterState.genres.indexOf(el.name);
                  state.filterState.genres.splice(i, 1);
                }
                break;
              case 'Pays':
                if (el.isChecked) {
                  state.filterState.countries.push(el.name);
                } else {
                  let i = state.filterState.countries.indexOf(el.name);
                  state.filterState.countries.splice(i, 1);
                }
                break;
              }
            }});
        }});
      state.isDefault = false;
    },
    setPeriodeMinVal(state, action) {
      state.periode.stateValues[0] = action.payload;
      state.isDefault = false;
    },
    setPeriodeMaxVal(state, action) {
      state.periode.stateValues[1] = action.payload;
      state.isDefault = false;
    },
    setQuery(state, action) {
      state.query = action.payload;
    }
  }
});

export const filters = (state: RootState) => state.filter;
export const filterState = (state: RootState) => state.filter.filterState;
export const getQuery = (state: RootState) => state.filter.query;
export const periodeBaseValues = (state: RootState) => state.filter.periode.baseValues;
export const periodeStateValues = (state: RootState) => state.filter.periode.stateValues;

export const { 
  initFilters,
  resetAllFilters,
  setSeasonFilter,
  setIsViewedFilter,
  setTagFilter,
  setPeriodeMinVal, 
  setPeriodeMaxVal,
  setQuery
} = filterSlice.actions;

export default filterSlice.reducer;