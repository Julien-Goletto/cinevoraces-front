import { useParams } from 'react-router-dom';
import { useGetOneUserQuery } from 'redux/api';
import UserInfo from './UserInfo';
import UserHeader from './UserHeader/UserHeader';
import UserMetrics from './UserMetrics/UserMetrics';
import UserSubmittedFilm from './UserSubmittedFilm/UserSubmittedFilm';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import styles from './User.module.scss';

function User() {
  const { id }  = useParams();
  const { data, isLoading } = useGetOneUserQuery(Number(id));
  
  return(
    <AnimationLayout>
      { (!isLoading && data) &&
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
          <UserInfo/>
        </section>
      }
    </AnimationLayout>
  );
}

export default User;