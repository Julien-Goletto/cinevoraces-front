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
  periode: {isBetween: [1900, 2077]}
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPeriode(state) {
      // TODO: code me
      // state.periode[];
    },
  }
});

export default filterSlice.reducer;