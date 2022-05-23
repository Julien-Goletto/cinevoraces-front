import { Button } from 'components/Buttons/Button';
import { useAllMoviesQuery } from 'redux/api';
import styles from './LastMoviesGrid.module.scss';
import { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import { Link } from 'react-router-dom';

function LastMoviesGrid() {

  const {data, isLoading} = useAllMoviesQuery();
  const [lastMovies, setLastMovies] = useState<DBMovie[]>();

  useEffect(()=> {
    if(!isLoading && data) {
      setLastMovies([...data].slice(0,5));
    }
  }, [data, isLoading]);
  

  return(
    (lastMovies && !isLoading) ?
      <div className={styles['last-movies']}>
        <h2 className={styles.title}>Les derniers ajouts de la communauté</h2>
        <div className={styles.grid}>
          {lastMovies.map(({poster_url, french_title, id}) => 
            <div className={styles.poster} key={id}>
              <Link to={`/film/${id}`}>
                <img 
                  className={styles.img}
                  src={poster_url} alt={`Affiche du film ${french_title}`}
                />
              </Link>
            </div>
          )}
        </div>

        <Button
          href='/films'
          styleMod='fill-rounded'
        >
          Voir la liste des films
        </Button>
      </div> : <Loader />
  );
}

export default LastMoviesGrid;