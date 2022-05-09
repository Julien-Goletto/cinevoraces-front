import Button from 'components/Buttons/Button';
import styles from 'Films.module.scss';
import Filters from './Filters/Filters';
import MoviesGrid from './MoviesGrid/MoviesGrid';

function Films() {
  return(
    <>
      <Filters/>
      <MoviesGrid/>
      <Button state='empty'>Voir les films suivants (77)</Button>
    </>
  );
}

export default Films;