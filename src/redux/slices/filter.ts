import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: FilterState = { 
  // TODO: Must get data from DB
  seasons: [
    {name: 'Tout les films', value: 'all', isChecked: true}, 
    {name: 'Saison 1', value: '1', isChecked: false}, 
    {name: 'Saison 2', value: '2', isChecked: false}, 
    {name: 'Saison 3', value: '3', isChecked: false}, 
  ],
  isViewed: [
    {name: 'Tous', value: 'all', isChecked: true},
    {name: 'Vus', value: 'viewed', isChecked: false},
    {name: 'À voir', value: 'not-viewed', isChecked: false},
  ],
  tags: [
    { 
      tagName: 'Genres',
      tags: [{name: 'Action', isChecked: false},{name: 'Épouvante', isChecked: false},{name: 'Historique', isChecked: false}]
    },
    { 
      tagName: 'Pays',
      tags: [{name: 'Alsace', isChecked: false},{name: 'Allemagne', isChecked: false},{name: 'Corse', isChecked: false},{name: 'États-Unis', isChecked: false}]
    }
  ],
  periode: {baseValues: [1900,2077], stateValues: [1900, 2077]}
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
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
    },
    setSeasonFilter(state, action) {
      state.seasons.forEach((el) => {
        (el.value === action.payload) ? el.isChecked = true : el.isChecked = false;
      });
    },
    setIsViewedFilter(state, action) {
      state.isViewed.forEach((el) => {
        (el.value === action.payload) ? el.isChecked = true : el.isChecked = false;
      });
    },
    setTagFilter(state, action) {
      state.tags.forEach((el) => {
        if (el.tagName === action.payload.tagName) {
          el.tags.forEach((el) => {
            if (el.name === action.payload.tag) {
              el.isChecked = !el.isChecked;
            }});
        }});
    },
    setPeriodeMinVal(state, action) {
      state.periode.stateValues[0] = action.payload;
    },
    setPeriodeMaxVal(state, action) {
      state.periode.stateValues[1] = action.payload;
    },
  }
});

export const filters = (state: RootState) => state.filter;
export const periodeBaseValues = (state: RootState) => state.filter.periode.baseValues;
export const periodeStateValues = (state: RootState) => state.filter.periode.stateValues;

export const { 
  resetAllFilters,
  setSeasonFilter,
  setIsViewedFilter,
  setTagFilter,
  setPeriodeMinVal, 
  setPeriodeMaxVal 
} = filterSlice.actions;

export default filterSlice.reducer;