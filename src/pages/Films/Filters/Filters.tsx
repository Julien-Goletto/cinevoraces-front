import { useState } from 'react';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { 
  filters, 
  setQuery, 
  setCountryFilter, 
  setGenreFilter,
  setPeriodeMinVal,
  setPeriodeMaxVal
} from 'redux/slices/filter';
import { Button, InputText, InputCheckbox, InputRadio, DoubleInputRange } from 'components/Inputs/InputsLib';
import { FilterMenu, DropDown } from './FilterMenu';
import styles from './Filters.module.scss';

function Filters() {
  const [isFilterMenu, setFilterMenu] = useState(false);
  const dispatch = useAppDispatch();
  const { mainFilters, query, genre, country, periode } = useAppSelector(filters);
  const handleFilterMenu = () => {
    (isFilterMenu) ? setFilterMenu(false) : setFilterMenu(true);
  };
  const handleSeasonSetter = (event: React.ChangeEvent<HTMLInputElement>) => {
    // dispatch(setSeasonFilter(event.target.value));
  };
  const handleCountryFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCountryFilter(event.target.value));
  };
  const handleGenreFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGenreFilter(event.target.value));
  };
  const handleMinPeriodeSetter = (value: number) => {
    dispatch(setPeriodeMinVal(value));
  };
  const handleMaxPeriodeSetter = (value: number) => {
    dispatch(setPeriodeMaxVal(value));
  };
  const handleSearchBarQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };
  
  return(
    <div className={styles.filters}>
      <Button handler={handleFilterMenu}> 
        Filtrer
        { (isFilterMenu) ? <img src='/images/filter-open.svg' alt='' /> : <img src='/images/filter-closed.svg' alt='' /> }
      </Button>
      <div className={styles['search-bar']}>
        <InputText 
          label='' 
          name='search'
          type='text'
          placeholder='Recherche un film'
          value={query}
          handler={handleSearchBarQuery}
        />
      </div>
      { isFilterMenu && 
        <FilterMenu handleClose={handleFilterMenu}>
          <DropDown name={'Saison'}>
            { mainFilters.map(({name, value, isChecked}) => (
              <InputRadio
                name={name}
                isChecked={isChecked}
                value={value}
                handler={handleSeasonSetter}
                field='season'
              />
            ))}
          </DropDown>
          <DropDown name='Genres'>
            { genre.map(({name, isChecked}, index) => (
              <li key={index}>
                <InputCheckbox
                  name={name}
                  isChecked={isChecked}
                  handler={handleGenreFilter}
                />
              </li>
            ))}
          </DropDown>
          <DropDown name='Pays'>
            { country.map(({name, isChecked}, index) => (
              <li key={index}>
                <InputCheckbox
                  name={name}
                  isChecked={isChecked}
                  handler={handleCountryFilter}
                />
              </li>
            ))}
          </DropDown>
          <DropDown name={'Période'}>
            <DoubleInputRange
              min={periode.baseValues[0]}
              max={periode.baseValues[1]}
              valueMin={periode.stateValues[0]}
              valueMax={periode.stateValues[1]}
              minSetter={handleMinPeriodeSetter}
              maxSetter={handleMaxPeriodeSetter}
              label='Période'
            />
          </DropDown>
        </FilterMenu>
      }
    </div>
  );
}

export default Filters;