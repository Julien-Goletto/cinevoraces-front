import Movie from '../Movie/Movie';
import Loader from 'components/Loader/Loader';
import styles from './MovieGrid.module.scss';

function MovieGrid({movies, isFetching}:any) {
  return (
    <div className={styles.grid}>
      { (isFetching) && 
        <Loader />
      }
      { (!isFetching && movies && movies.length > 0) &&
        movies.map((movie:ProposalMovie)=> 
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