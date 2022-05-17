import { userLogged } from 'redux/slices/user';
import { useAppSelector } from 'redux/hooks';
import { useParams } from 'react-router-dom';
import UserHeader from './UserHeader/UserHeader';
import UserMetrics from './UserMetrics/UserMetrics';
import UserSubmittedFilm from './UserSubmittedFilm/UserSubmittedFilm';
import UserParams from './UserParams/UserParams';
import styles from './User.module.scss';
import { useMetricsByIdQuery } from 'redux/api';

const fake_data = {
  mail: 'caroline-du-93@lol.fr',
  registerDate: '2077-12-10 10:23:54+02',
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
  const { id }  = useParams();
  const { pseudo, avatar } = useAppSelector<any>(userLogged);
  const { stats, registerDate, mail, submittedMovie } = fake_data;
  //en attente de la route par les backeuuu
  const {data, isLoading} = useMetricsByIdQuery(Number(id));
  console.log(data);
  
  return(
    <>
      <section className={styles['user']}>
        <h1 className={styles['title']}>Mon compte</h1>
        <UserHeader
          username={pseudo}
          avatar={avatar}
          registerDate={registerDate}
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
          username={pseudo}
          email={mail}
        />
      </section>
    </>
  );
}

export default User;