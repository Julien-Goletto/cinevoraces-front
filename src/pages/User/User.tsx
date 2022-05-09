import { UserHeader, UserMetrics } from './UserSections';
import styles from './User.module.scss';

const fake_data = {
  username: 'PrincessJambon59',
  avatar: '',
  createdAt: '2004-10-19 10:23:54+02',
  stats: {
    uploadedMovies: 6,
    commentedMovies: 77,
    LikedMovies: 185,
    watchList: 84,
    evaluatedMovies: 96,
  }
};

function User() {
  const { username, avatar, createdAt } = fake_data;
  const { stats } = fake_data;

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
      </section>
    </>
  );
}

export default User;