import styles from './LastMoviesGrid.module.scss';

const fake_data: {[key:string]: string}[] = [
  { title: 'Jawas', cover: 'fake_data/covers/cover_1.jpg', },
  { title: 'Mr. Clean', cover: 'fake_data/covers/cover_2.jpg', },
  { title: 'Stay in', cover: 'fake_data/covers/cover_3.jpg', },
  { title: 'L.A. Noire', cover: 'fake_data/covers/cover_4.jpg', },
  { title: 'I, Phone', cover: 'fake_data/covers/cover_5.jpg', }
];

function LastMoviesGrid() {
  return(
    <div className={`${styles['last-movies']} container`}>
      <h2 className={styles.title}>Les derniers ajouts de la communauté</h2>
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

      {/* // TODO : Use Button component */}
      <button style={{
        height: '34px',
        width: '190px',
        margin: 0,
        right: 0,
      }}
      >Voir la liste des films</button>
    </div>
  );
}

export default LastMoviesGrid;