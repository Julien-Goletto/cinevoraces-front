import styles from './Description.module.scss';
import StarRating from 'components/StarRating/StarRating';

function Description({ movie }: Description) {
  const date = new Date(movie.release_date);
  return (
    <div className={styles.description}>
      <h1 className={styles.title}>{movie.french_title}<span className={styles.year}>({date.getFullYear()})</span></h1>
      <div className={`${styles.element} ${styles['element--flex']}`}>
          Note des membres :
        <span className={styles.star}><StarRating value={1}/></span> 
      </div>
      <div className={`${styles.element} ${styles['element--flex']}`}>
          Ma note :
        <span className={styles.star}><StarRating value={4}/></span> 
      </div>
      <div className={styles.element}>
          Réalisateur :
        <span className={styles.elm}>{movie.directors.join(', ')}</span>
      </div>
      <div className={styles.element}>
            Genre :
        <div>
          {movie.genres.map((genre:string, index:number) =>
            <span className={`${styles.elm} ${styles['elm--orange']}`}>
              {genre}
              {(index + 1 !== movie.genres.length) && ', '}
            </span> 
          )}
        </div>
      </div>
      <div className={styles.element}>
          Pays :
        {movie.countries.map((country:string, index:number) =>
          <span className={`${styles.elm} ${styles['elm--orange']}`}>{}</span>
        )}
      </div>
      <div className={styles.element}>
          Durée :
        <span className={`${styles.elm} ${styles['elm--weight']}`}>{movie.runtime}min</span>
      </div>
      <div className={styles.casting}>
        <span className={styles.cast}>Casting :</span>
        <ul>
          {movie.casting.map((actor:string, index:number) => 
            <li key={index} className={styles.list}>{actor}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Description;