import { Button } from 'components/Buttons/Button';
import styles from './Films.module.scss';
import Filters from './Filters/Filters';
import MoviesGrid from './MoviesGrid/MoviesGrid';

function Films() {
  return(
    <section className={styles.films}>
      <Filters/>
      <MoviesGrid/>
      <div className={styles.button}>
        <Button>
          Voir les films suivants (77)
        </Button>
      </div>
    </section>
  );
}

export default Films;