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
    initFilters(state, {payload}: {payload: DBMovie[]}) {
      // Init object to return
      const formatedData: FilterStateConstructor = {
        seasons: [{name: 'Tous les films', value: 'all', isChecked: true}],
        tags: [{tagName: 'Genres', tags: []},{tagName: 'Pays', tags: []}],
        periode: {baseValues: [], stateValues: []}
      };
      // Init filters containers
      const seasonArr: string[] = [];
      const release_dateArr: number[] = [];
      const genreArr: string[] = [];
      const countryArr: string[] = [];
      payload.forEach(({
        season_number,
        genres,
        countries,
        release_date,
      }) => {
        // Push in filter container if not already present
        !(seasonArr.includes(String(season_number))) && 
            seasonArr.push(String(season_number));
        !(release_dateArr.includes(Number(release_date.slice(0,4)))) && release_dateArr.push(Number(release_date.slice(0,4)));
        genres.forEach((genre) => {
          !(genreArr.includes(genre)) && genreArr.push(genre);
        });
        countries.forEach((country) => {
          !(countryArr.includes(country)) && countryArr.push(country);
        }); 
      });
      // Format and push each occurence in return object
      seasonArr.forEach((season) => {
        formatedData.seasons.push({ name: `Saison ${season}`, value: season, isChecked: false });
      });
      genreArr.forEach((genre) => {
        formatedData.tags[0].tags.push({name: genre, isChecked: false});
      });
      countryArr.forEach((country) => {
        formatedData.tags[1].tags.push({name: country, isChecked: false});
      });
      formatedData.periode.baseValues.push(Math.min(...release_dateArr));
      formatedData.periode.baseValues.push(Math.max(...release_dateArr));
      formatedData.periode.stateValues.push(Math.min(...release_dateArr));
      formatedData.periode.stateValues.push(Math.max(...release_dateArr));  
      
      state.periode = formatedData.periode;
      state.tags = formatedData.tags;
      state.seasons = formatedData.seasons;
      state.filterState.season_number = formatedData.seasons[0].value;
    },
    resetAllFilters(state) {
      const initialFilter = initialState.filterState;
      state.filterState = initialFilter;
      
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
export const filterYearState = (state: RootState) => state.filter.periode.stateValues;
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