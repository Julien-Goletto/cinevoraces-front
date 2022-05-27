import { useParams } from 'react-router-dom';
import { useUserByIdQuery } from 'redux/api';
import UserHeader from './UserHeader/UserHeader';
import UserMetrics from './UserMetrics/UserMetrics';
import UserSubmittedFilm from './UserSubmittedFilm/UserSubmittedFilm';
import UserParams from './UserParams/UserParams';
import styles from './User.module.scss';

function User() {
  const { id }  = useParams();
  const { data, isLoading } = useUserByIdQuery(Number(id));
  
  return(
    <>
      { !isLoading &&
        <section className={styles['user']}>
          <h1 className={styles['title']}>Mon compte</h1>
          <UserHeader
            username={data.pseudo}
            avatar={data.avatar_url}
            registerDate={data.created_at}
          />
          <h2 className={styles['title-h2']}>
            Mon récapitulatif en 5 <span>chiffres :</span>
          </h2>
          { id &&
            <UserMetrics id={id} />
          }
          <UserSubmittedFilm
            id={id!}
          />
          <h2 className={styles['title-h2']}>
            Mes paramètres :
          </h2>
          <UserParams
            username={data.pseudo}
            email={data.mail}
            avatar={data.avatar_url}
          />
        </section>
      }
    </>
  );
}

export default User;