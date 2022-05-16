import Movie from '../Movie/Movie';
import Loader from 'components/Loader/Loader';
import styles from './MovieGrid.module.scss';


function MovieGrid({movies, loading}:any) {

  return (
    <div className={styles.grid}>
      { (loading) && 
        <Loader />
      }
      { (!loading && movies && movies.length > 0) &&
        movies.map((movie: TMDBMovie, id: number)=> (
          <Movie key={id} title={movie.title} genres={movie.genres} release={movie.release} directors={movie.directors} poster_url={movie.poster_url} />
        ))
      }
    </div>
  );
}

export default MovieGrid;