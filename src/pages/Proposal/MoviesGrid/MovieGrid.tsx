import Movie from '../Movie/Movie';
import styles from './MovieGrid.module.scss';


function MovieGrid({movies, loading}:any) {
  console.log(movies);
  
  
  return (
    <div className={styles.grid}>
      { (!loading && movies && movies.length > 0) &&
        movies.map((movie: TMDBMovie)=> (
          <Movie title={movie.title} genres={movie.genres} release={movie.release} directors={movie.directors} poster_url={movie.poster_url} />
        ))
      }
    </div>
  );
}

export default MovieGrid;