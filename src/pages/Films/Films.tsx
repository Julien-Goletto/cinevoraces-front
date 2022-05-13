import { Button } from 'components/Buttons/Button';
import styles from './Films.module.scss';
import Filters from './Filters/Filters';
import MoviesGrid from './MoviesGrid/MoviesGrid';
import { useAllMoviesQuery } from 'redux/api';

function Films() {
  const { data, isLoading } = useAllMoviesQuery();
  return(
    <section className={styles.films}>
      <Filters/>
      <MoviesGrid 
        movies={data} 
        isLoading={isLoading}
      />
      <div className={styles.button}>
        <Button>
          Voir les films suivants (77)
        </Button>
      </div>
    </section>
  );
}

export default Films;