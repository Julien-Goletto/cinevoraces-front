import { useState } from 'react';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import styles from './Filters.module.scss';

function Filters() {
  // TODO : Use Redux
  const [isDropMenu, SetIsDropMenu] = useState(true);
  
  return(
    <div className={`container ${styles.filters}`}>
      {/* // TODO : Use Button component */}
      <button style={{
        height: '33px', width: '151px', fontSize: '14px', fontWeight: 'medium',
        color: 'white', borderRadius: '15px', border: 'white solid 1px', background: 'none'
      }}
      onClick={() => {
        (isDropMenu) ? SetIsDropMenu(false) : SetIsDropMenu(true);
      }}
      >Tout les films</button>
      
      <div className={styles['filters-search-bar']}>
        <img src='images/input_search.svg' alt='' />
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