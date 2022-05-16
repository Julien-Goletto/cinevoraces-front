import { useState } from 'react';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { Button } from 'components/Buttons/Button';
import styles from './Filters.module.scss';

function Filters() {
  const [isDropMenu, SetIsDropMenu] = useState(false);
  const handleDropDownState = () => {
    (isDropMenu) ? SetIsDropMenu(false) : SetIsDropMenu(true);
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
        <img src='/images/input_search.svg' alt='' />
        <input 
          placeholder='Filtrer par titre'
          type='text'
        />
      </div>
      { isDropMenu && <DropDownMenu/> }
    </div>
  );
}

export default Filters;