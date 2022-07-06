import styles from './Movie.module.scss';

function Director ({directors}: {directors: string[]}) {
  //SET max director to 3. This avoid large string.
  if (directors) directors = directors.slice(0,3);
  
  return(
    <div className={styles.rea}>
      { (directors && directors.length > 0) &&
      <>
        Réalisateur{directors.length > 0 ? 's' : ''} : {directors.join(', ')}
      </>
      }
      { (directors && directors.length === 0) && 'Réalisateur: N/C'}
    </div>
  );
}

export default Director;