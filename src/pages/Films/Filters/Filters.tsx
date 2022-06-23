import { useState } from 'react';
import { Button, InputText } from 'components/Inputs/InputsLib';
import { getQuery, setQuery } from 'redux/slices/filter';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import styles from './Filters.module.scss';

function Filters() {
  const [isDropMenu, SetIsDropMenu] = useState(false);
  const dispatch = useAppDispatch();
  const query = useAppSelector(getQuery);
  const handleDropDownState = () => {
    (isDropMenu) ? SetIsDropMenu(false) : SetIsDropMenu(true);
  };
  const onChangeHandler = (event: onChangeEvent) => {
    const value = event.target.value;
    dispatch(setQuery(value));
  };
  
  return(
    <div className={styles.filters}>
      <Button 
        handler={handleDropDownState}
      >
        Filtrer
        { (isDropMenu) ?
          <img src='/images/filter-open.svg' alt='' />
          :
          <img src='/images/filter-closed.svg' alt='' />
        }
      </Button>
      <div className={styles['search-bar']}>
        <InputText 
          label='' 
          name='search'
          type='text'
          placeholder='Recherche un film'
          value={query}
          onChange={onChangeHandler}
        />
      </div>
      { isDropMenu && <DropDownMenu/> }
    </div>
  );
}

export default Filters;