import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type FilterState = {
  mainFilters: filter[],
  genre: filter[],
  country: filter[],
  periode: {[key: string]: number[]},
  query: string,
  isDefault: boolean,
  isLogged: boolean
}

const initialState: FilterState = { 
  mainFilters: [
    {name: 'Tout les films', value: '', isChecked: false}
  ],
  periode: {
    baseValues: [1919, new Date().getFullYear()],
    stateValues: [1919, new Date().getFullYear()]
  },
  genre: [],
  country: [],
  query: '',
  isDefault: true,
  isLogged: false
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    initFilters(state, {payload}: {payload: DBFilters[]}) {
      // Recreate initial state with fetched data
      const formatedData: FilterState = {
        ...state,
        periode: {
          baseValues: [payload[0].min_max_dates[0], payload[0].min_max_dates[1]],
          stateValues: [payload[0].min_max_dates[0], payload[0].min_max_dates[1]]
        },};
      // Init filters containers
      payload.forEach(({
        seasons_list,
        genres_list,
        countries_list,
      }) => {
        // Format Season
        let constructor: Array<any> = []; // Push new values in constructor
        seasons_list.forEach((season) => {
          !(constructor.includes(season)) && constructor.push(season);
        });
        constructor.forEach((season, index) => { // Format and push in new state
          formatedData.mainFilters.push(
            { name: `Saison ${season[0]} - ${season[1]}`, value: `season_number=${season[0]}`, 
              isChecked: (index === constructor.length - 1) ? true : false});
        });
        constructor = []; // Reset constructor
        // Format genres
        genres_list.forEach((genre) => {
          !(constructor.includes(genre)) && constructor.push(genre);
        });
        constructor.forEach((genre) => {
          formatedData.genre.push({name: genre, isChecked: false});
        });
        constructor = [];
        // Format countries
        countries_list.forEach((country) => {
          !(constructor.includes(country)) && constructor.push(country);
        }); 
        constructor.forEach((country) => {
          formatedData.country.push({name: country, isChecked: false});
        });
      });
      state = formatedData;
    },
    resetFilters(state) {
      // Reset Season
      state.mainFilters.forEach((el, index) => {
        el.isChecked = (index === state.mainFilters.length - 1) ? true : false; // Set last season true
      });
      // Reset Tags
      [state.genre, state.country].forEach((tag) => {
        tag.forEach((el) => {
          el.isChecked = false;
        });
      });
      // Reset Periodes
      state.periode.stateValues = state.periode.baseValues;
      state.isDefault = true;
    },
    setMainFilter(state, action) {
      state.mainFilters.forEach((el) => {
        el.isChecked = (el.value === action.payload) ? true : false;
      });
      state.isDefault = false;
    },
    setCountryFilter(state, action) {
      state.country.forEach((el) => {
        if (el.name === action.payload) {
          el.isChecked = !el.isChecked;};
      });
      state.isDefault = false;
    },
    setGenreFilter(state, action) {
      state.genre.forEach((el) => {
        if (el.name === action.payload) {
          el.isChecked = !el.isChecked;};
      });
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

export const { 
  initFilters,
  resetFilters,
  setMainFilter,
  setCountryFilter,
  setGenreFilter,
  setPeriodeMinVal, 
  setPeriodeMaxVal,
  setQuery
} = filterSlice.actions;

export default filterSlice.reducer;