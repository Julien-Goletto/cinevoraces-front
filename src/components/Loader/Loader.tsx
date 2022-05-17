import styles from './Loader.module.scss';

function LoadingAnim() {
  return(
    <div className={styles['lds-ellipsis']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

function Loader({isMaxed}: Loader) {
  return(
    <>
      { isMaxed && 
        <div className={styles['lds-container']}>
          <LoadingAnim />
        </div>
      }
      { !isMaxed && 
        <LoadingAnim />
      }
    </>
  );
}

export default Loader;