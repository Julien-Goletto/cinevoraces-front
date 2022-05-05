import styles from './Filters.module.scss';

function Filters() {
  return(
    <div className={`${styles.filters} container`}>
      {/* // TODO : Use Button component */}
      <button style={{
        height: '33px', width: '151px', fontSize: '14px', fontWeight: 'medium',
        color: 'white', borderRadius: '15px', border: 'white solid 1px', background: 'none'
      }}
      >Tout les films</button>
      <input type='text'/>
    </div>
  );
}

export default Filters;