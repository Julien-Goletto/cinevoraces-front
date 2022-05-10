import UserHeader from './UserHeader/UserHeader';
import UserMetrics from './UserMetrics/UserMetrics';
import UserSubmittedFilm from './UserSubmittedFilm/UserSubmittedFilm';
import UserParams from './UserParams/UserParams';
import styles from './User.module.scss';

const fake_data = {
  username: 'PrincessJambon59',
  avatar: '',
  email: 'princessham59@elsass.de',
  createdAt: '2004-10-19 10:23:54+02',
  stats: {
    uploadedMovies: 6,
    commentedMovies: 77,
    LikedMovies: 185,
    watchList: 84,
    evaluatedMovies: 96,
  },
  submittedMovie: 
  undefined
  // {
  //   title: 'Mr. Clean',
  //   cover: 'fake_data/covers/cover_2.jpg',
  //   releaseDate: 2020,
  //   director: ['Dwayne Johnson'],
  //   genres: ['Humour', 'Suspense insoutenable'],
  //   publishDate: '02/05/2077'
  // },
};

function User() {
  const { username, avatar, createdAt, email } = fake_data;
  const { stats } = fake_data;
  const { submittedMovie } = fake_data;

  return(
    <>
      <section className={`container ${styles['user']}`}>
        <h1 className={styles['title']}>Mon compte</h1>
        <UserHeader
          username={username}
          avatar={avatar}
          registerDate={createdAt}
        />
        <h2 className={styles['title-h2']}>
          Mon récapitulatif en 5 <span>chiffres :</span>
        </h2>
        <UserMetrics
          stats={stats}
        />
        <UserSubmittedFilm
          film={ submittedMovie }
        />
        <h2 className={styles['title-h2']}>
          Modifier mes <span>paramètres :</span>
        </h2>
        <UserParams
          username={username}
          email={email}
        />
      </section>
    </>
  );
}

export default User;