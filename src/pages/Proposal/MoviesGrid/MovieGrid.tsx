import Movie from '../Movie/Movie';
import styles from './MovieGrid.module.scss';

function MovieGrid() {



  return (
    <div className={styles.grid}>
      <Movie french_title='Mr Clean, The Movie' genres={['Action', 'Super-Hero']} release='2015' directors={['Dan']} poster_url='fake_data/covers/cover_2.jpg'/>
      <Movie french_title='Jawas' genres={['Action', 'Super-Hero']} release='2012' directors={['Garfield', 'David Coperfield']} poster_url='fake_data/covers/cover_1.jpg' />
      <Movie  french_title='Iphone' genres={['Action', 'Super-Hero']} release='2022' directors={['Bill Gates']} poster_url='fake_data/covers/cover_5.jpg' />
    </div>
  );
}

export default MovieGrid;