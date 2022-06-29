import Movie from '../Movie/Movie';
import Loader from 'components/Loader/Loader';
import styles from './MovieGrid.module.scss';

type MovieGridProps = {
  isFetching: boolean,
  movies: {
    id?: number,
    episode?: string
    french_title: string,
    original_title: string,
    poster_url: string,
    directors: string[],
    release_date: string,
    runtime: number,
    casting: string[],
    presentation?: string,
    publishing_date?: string,
    user_id?: number,
    season_id?: number,
    movie_genres: string[],
    movie_languages: string[],
    movie_countries: string[],
  }[]
}

function MovieGrid({movies, isFetching}: MovieGridProps) {
  return (
    <div className={styles.grid}>
      { (isFetching) && 
        <Loader />
      }
      { (!isFetching && movies && movies.length > 0) &&
        movies.map((movie)=> 
          (
            <Movie 
              key={movie.id}
              movie={movie}
            />))
      }
      {
        (movies && movies.length <= 0 && !isFetching ) &&
        <div className={styles.empty}>Aucun film trouvé</div>
      }
    </div>
  );
}

export default MovieGrid;