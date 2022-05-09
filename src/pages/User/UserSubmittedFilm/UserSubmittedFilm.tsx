import Button from 'components/Buttons/Button';
import userStyles from '../User.module.scss';
import styles from './UserSubmittedFilm.module.scss';

function UserSubmittedFilm({ film }: UserSubmittedFilm) {
  return(
    <div className={styles['user-submitted']}>
      { !film &&
        <div className={`container ${styles['no-film-submitted']}`}>
          <p>
            Vous n’avez
            <span>&nbsp;pas de proposition de film en attente</span>
            . Une idée? C’est par ici!
          </p>
          <Button
            state='full'
          >
            Proposer un film
          </Button>
        </div>
      }
      { film &&
        <div className={`container ${styles['pending-proposal']}`}>
          <h2 className={userStyles['title-h2']}>Ma proposition en <span>attente :</span></h2>
          <div className={styles['film']}>

          </div>
          <Button
            state='full'
          >
            Modifier ma proposition
          </Button>
        </div>
      }
    </div>
  );
}

export default UserSubmittedFilm;