import { Button } from 'components/Buttons/Button';
import styles from './LastMoviesGrid.module.scss';

const fake_data: {[key:string]: any}[] = [
  { title: 'Jawas', cover: 'fake_data/covers/cover_1.jpg', id: 1},
  { title: 'Mr. Clean', cover: 'fake_data/covers/cover_2.jpg', id: 2},
  { title: 'Stay in', cover: 'fake_data/covers/cover_3.jpg', id: 3},
  { title: 'L.A. Noire', cover: 'fake_data/covers/cover_4.jpg', id: 4},
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', id: 5}
];

function LastMoviesGrid() {
  return(
    <div className={styles['last-movies']}>
      <h2 className={styles.title}>Les derniers ajouts de la communauté</h2>
      <div className={styles.grid}>
        {fake_data.map(({cover, title, id}) => 
          <div className={styles.poster} key={id}>
            <img 
              className={styles.img}
              src={cover} alt={`Affiche du film ${title}`}
            />
          </div>
        )}
      </div>

      <Button
        href='/films'
        styleMod='fill-rounded'
      >
        Voir la liste des films
      </Button>
    </div>
  );
}

export default LastMoviesGrid;