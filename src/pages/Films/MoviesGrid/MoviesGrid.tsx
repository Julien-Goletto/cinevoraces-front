import styles from './MoviesGrid.module.scss';

const fake_data: {[key:string]: string}[] = [
  { title: 'Jawas', cover: 'fake_data/covers/cover_1.jpg', },
  { title: 'Mr. Clean', cover: 'fake_data/covers/cover_2.jpg', },
  { title: 'Stay in', cover: 'fake_data/covers/cover_3.jpg', },
  { title: 'L.A. Noire', cover: 'fake_data/covers/cover_4.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', },
  { title: 'Jawas', cover: 'fake_data/covers/cover_1.jpg', },
  { title: 'Mr. Clean', cover: 'fake_data/covers/cover_2.jpg', },
  { title: 'Stay in', cover: 'fake_data/covers/cover_3.jpg', },
  { title: 'L.A. Noire', cover: 'fake_data/covers/cover_4.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', },
  { title: 'Jawas', cover: 'fake_data/covers/cover_1.jpg', },
  { title: 'Mr. Clean', cover: 'fake_data/covers/cover_2.jpg', },
  { title: 'Stay in', cover: 'fake_data/covers/cover_3.jpg', },
  { title: 'L.A. Noire', cover: 'fake_data/covers/cover_4.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', },
  { title: 'Jawas', cover: 'fake_data/covers/cover_1.jpg', },
  { title: 'Mr. Clean', cover: 'fake_data/covers/cover_2.jpg', },
  { title: 'Stay in', cover: 'fake_data/covers/cover_3.jpg', },
  { title: 'L.A. Noire', cover: 'fake_data/covers/cover_4.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', },
  { title: 'Jawas', cover: 'fake_data/covers/cover_1.jpg', },
  { title: 'L.A. Noire', cover: 'fake_data/covers/cover_4.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', },
  { title: 'Stay in', cover: 'fake_data/covers/cover_3.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', },
  { title: 'Mr. Clean', cover: 'fake_data/covers/cover_2.jpg', },
  { title: 'Stay in', cover: 'fake_data/covers/cover_3.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', },
  { title: 'Jawas', cover: 'fake_data/covers/cover_1.jpg', },
  { title: 'Mr. Clean', cover: 'fake_data/covers/cover_2.jpg', },
  { title: 'Stay in', cover: 'fake_data/covers/cover_3.jpg', },
  { title: 'Jawas', cover: 'fake_data/covers/cover_1.jpg', },
  { title: 'L.A. Noire', cover: 'fake_data/covers/cover_4.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', },
  { title: 'Jawas', cover: 'fake_data/covers/cover_1.jpg', },
  { title: 'L.A. Noire', cover: 'fake_data/covers/cover_4.jpg', },
  { title: 'Mr. Clean', cover: 'fake_data/covers/cover_2.jpg', },
  { title: 'Stay in', cover: 'fake_data/covers/cover_3.jpg', },
  { title: 'L.A. Noire', cover: 'fake_data/covers/cover_4.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', },
  { title: 'Mr. Clean', cover: 'fake_data/covers/cover_2.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', },
  { title: 'Jawas', cover: 'fake_data/covers/cover_1.jpg', },
  { title: 'Mr. Clean', cover: 'fake_data/covers/cover_2.jpg', },
  { title: 'Stay in', cover: 'fake_data/covers/cover_3.jpg', },
  { title: 'L.A. Noire', cover: 'fake_data/covers/cover_4.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', }
];

function MoviesGrid() {

  return(
    <div className={styles.grid}>
      {fake_data.map(({cover, title}) => 
        <div className={styles.poster}>
          <img 
            className={styles.img}
            src={cover} alt={`Affiche du film ${title}`}
          />
        </div>
      )}
    </div>
  );
};

export default MoviesGrid;