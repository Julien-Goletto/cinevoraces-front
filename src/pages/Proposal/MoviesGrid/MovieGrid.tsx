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
        movies.map((movie:ProposalMovie)=> 
          (
            <Movie 
              key={movie.id}
              movie={movie}
            />))
      }
    </div>
  );
}

export default MovieGrid;