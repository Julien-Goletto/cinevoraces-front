import { InputStar } from 'components/Inputs/InputsLib';
import { useAppSelector } from 'redux/hooks';
import { userState } from 'redux/slices/user';
import { userInteractions } from 'redux/slices/interaction';
import styles from './Description.module.scss';

type DescriptionProps = {
  movie: DBMovie
}

function Description({ movie }: DescriptionProps) {
  const isLogged = useAppSelector(userState);
  const {rating} = useAppSelector(userInteractions);
  const date = new Date(movie.release_date);
  
  return (
    <div className={styles.description}>
      <h1 className={styles.title}>{movie.french_title}<span className={styles.year}>({date.getFullYear()})</span></h1>
      <div className={`${styles.element} ${styles['element--flex']}`}>
          Note des membres :
        <span className={styles.star}><InputStar value={Number(movie.avg_rating)}/></span> 
      </div>
      {isLogged && 
      <div className={`${styles.element} ${styles['element--flex']}`}>
          Ma note :
        <span className={styles.star}><InputStar value={typeof rating == 'boolean' ? 0 : rating}/></span> 
      </div>
      }
      <div className={styles.element}>
          Réalisateur :
        <span className={styles.elm}>{movie.directors.join(', ')}</span>
      </div>
      <div className={styles.element}>
            Genre :
        <span className={`${styles.elm} ${styles['elm--orange']}`}>{movie.genres.join(', ')}</span> 
      </div>
      <div className={styles.element}>
          Pays :
        <span className={`${styles.elm} ${styles['elm--orange']}`}>{movie.countries.join(', ')}</span>
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