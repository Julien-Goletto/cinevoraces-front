import styles from './Filters.module.scss';

function Filters() {
  return(
    <div className={`container ${styles.filters}`}>
      {/* // TODO : Use Button component */}
      <button style={{
        height: '33px', width: '151px', fontSize: '14px', fontWeight: 'medium',
        color: 'white', borderRadius: '15px', border: 'white solid 1px', background: 'none'
      }}      
      >Tout les films</button>
      
      <div className={styles['filters__search-bar']}>
        <img src='images/input_search.svg' alt='' />
        <input 
          className={styles['filters__search-bar__input']}
          placeholder='Filtrer par titre'
          type='text'
        />
      </div>
    </div>
  );
}

export default Filters;