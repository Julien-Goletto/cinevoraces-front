import Movie from '../Movie/Movie';
import Loader from 'components/Loader/Loader';
import styles from './MovieGrid.module.scss';

function MovieGrid({movies, isLoading}:any) {

  return (
    <div className={styles.grid}>
      { (isLoading) && 
        <Loader />
      }
      { (!isLoading && movies && movies.length > 0) &&
        movies.map((movie: TMDBMovie)=> (
          <Movie 
            key={movie.id}
            id={movie.id} 
            title={movie.title} 
            release_date={movie.release_date} 
            poster_path={movie.poster_path} 
          />
        ))
      }
    </div>
  );
}

export default MovieGrid;