import { Link } from 'react-router-dom';
import styles from './MoviesGrid.module.scss';

function MoviesGrid({ movies, isLoading }: MovieGrid) {

  return(
    <div className={styles.grid}>
      {!isLoading &&
        movies.map((movie:any) => 
          <div 
            className={styles.poster}
            key={movie.id}
          >
            <Link to={`/film/${movie.id}`}>
              <img 
                className={styles.img}
                src={movie.poster_url} alt={`Affiche du film ${movie.title}`}
              />
            </Link>
          </div>
        )}
    </div>
  );
};

export default MoviesGrid;