import { useState } from 'react';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { getQuery, setQuery, filters, setSeasonFilter, setTagFilter } from 'redux/slices/filter';
import { Button, InputText } from 'components/Inputs/InputsLib';
import { FilterMenu, DropDown } from './FilterMenu';
import styles from './Filters.module.scss';

function Filters() {
  const [isDropMenu, SetIsDropMenu] = useState(false);
  const dispatch = useAppDispatch();
  const query = useAppSelector(getQuery);

  // Handlers
  const handleDropDownState = () => {
    (isDropMenu) ? SetIsDropMenu(false) : SetIsDropMenu(true);
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setQuery(value));
  };
  
  return(
    <div className={styles.filters}>
      <Button handler={handleDropDownState}> 
        Filtrer
        { (isDropMenu) ? <img src='/images/filter-open.svg' alt='' /> : <img src='/images/filter-closed.svg' alt='' /> }
      </Button>
      <div className={styles['search-bar']}>
        <InputText 
          label='' 
          name='search'
          type='text'
          placeholder='Recherche un film'
          value={query}
          handler={handleOnChange}
        />
      </div>
      { isDropMenu && 
        <FilterMenu handleClose={handleDropDownState}>
          <DropDown name='Genres'>
            Jambon
          </DropDown>
        </FilterMenu>
      }
    </div>
  );
}

export default Filters;