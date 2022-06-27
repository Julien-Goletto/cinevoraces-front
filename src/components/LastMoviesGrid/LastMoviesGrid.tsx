import { useAllMoviesQuery } from 'redux/api';
import { Link } from 'react-router-dom';
import { Button } from 'components/Inputs/InputsLib';
import Loader from 'components/Loader/Loader';
import styles from './LastMoviesGrid.module.scss';

/**
 * @return grid with the last 5 movies posted
 */
function LastMoviesGrid() {
  const {data: movies, isLoading} = useAllMoviesQuery('');

  return(
    <>
      { !isLoading && movies &&
        <div id='last-movie' className={styles['last-movies']}>
          <h2 className={styles.title}>Les derniers ajouts de la communauté</h2>
          <div className={styles.grid}>
            {/* Map only last 5 movies */}
            {[...movies].slice(0,5).map(({poster_url, id}) => 
              <div className={styles.poster} key={id}>
                <Link to={`/film/${id}`}>
                  <img className={styles.img} src={poster_url} alt={''}/>
                </Link>
              </div>)}
          </div>
          <Button href='/films' styleMod='fill-rounded'>
            Voir la liste des films
          </Button>
        </div>}
      { isLoading &&
        <div id='last-movie' className={styles.loader}>
          <Loader />
        </div>}
    </>
  );
}

export default LastMoviesGrid;