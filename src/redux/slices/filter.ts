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
    setSeasonFilter(state, action) {
      state.seasons.forEach((season) => {
        (season.value === action.payload) ? season.isChecked = true : season.isChecked = false;
      });
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
  setSeasonFilter,
  setPeriodeMinVal, 
  setPeriodeMaxVal 
} = filterSlice.actions;

export default filterSlice.reducer;