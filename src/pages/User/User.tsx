import { userLogged } from 'redux/slices/user';
import { useAppSelector } from 'redux/hooks';
import { useParams } from 'react-router-dom';
import UserHeader from './UserHeader/UserHeader';
import UserMetrics from './UserMetrics/UserMetrics';
import UserSubmittedFilm from './UserSubmittedFilm/UserSubmittedFilm';
import UserParams from './UserParams/UserParams';
import styles from './User.module.scss';
import { useUserByIdQuery } from 'redux/api';

const fake_data = {
  submittedMovie: 
  // undefined
  {
    title: 'Mr. Clean',
    cover: 'fake_data/covers/cover_2.jpg',
    releaseDate: 2020,
    director: ['Dwayne Johnson'],
    genres: ['Humour', 'Suspense insoutenable'],
    publishDate: '02/05/2077'
  },
};

function User() {
  const { id }  = useParams();
  const { pseudo, avatar } = useAppSelector<any>(userLogged);
  const { submittedMovie } = fake_data;
  const { data, isLoading } = useUserByIdQuery(Number(id));
  
  return(
    <>
      { !isLoading &&
        <section className={styles['user']}>
          <h1 className={styles['title']}>Mon compte</h1>
          <UserHeader
            username={pseudo}
            avatar={avatar}
            registerDate={data.created_at}
          />
          <h2 className={styles['title-h2']}>
            Mon récapitulatif en 5 <span>chiffres :</span>
          </h2>
          { id &&
            <UserMetrics id={id} />
          }
          <UserSubmittedFilm
            id={id}
            film={ submittedMovie }
          />
          <h2 className={styles['title-h2']}>
            Modifier mes <span>paramètres :</span>
          </h2>
          <UserParams
            username={data.pseudo}
            email={data.mail}
          />
        </section>
      }
    </>
  );
}

export default User;