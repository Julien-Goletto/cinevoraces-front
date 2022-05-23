import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MoviesGrid.module.scss';
import Loader from 'components/Loader/Loader';

function MoviesGrid({ movies, isLoading }: MovieGrid) {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const onLoadHandler = () => {
    setTimeout(() => {setIsImgLoading(false);}, 1000);
  };
  
  return(
    <div className={styles.grid}>
      {(isLoading || isImgLoading) &&
        <div className={styles['loader-wrapper']}>
          <Loader />
        </div>
      }
      {!isLoading &&
        movies.map((movie:any) => 
          <div 
            className={styles.poster}
            key={movie.id}
          >
            <Link to={`/film/${movie.id}`}>
              <img 
                className={`${styles.img} ${isImgLoading && styles.hidden}`}
                src={movie.poster_url} alt={`Affiche du film ${movie.title}`}
                onLoad={onLoadHandler}
              />
            </Link>
          </div>
        )}
    </div>
  );
};

export default MoviesGrid;