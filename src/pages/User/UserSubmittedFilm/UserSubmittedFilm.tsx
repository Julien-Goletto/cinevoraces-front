import { Button } from 'components/Buttons/Button';
import userStyles from '../User.module.scss';
import styles from './UserSubmittedFilm.module.scss';
import { usePendingProposalByUserQuery } from 'redux/api';

function UserSubmittedFilm({ film, id }: any) {
  const { data, isLoading } = usePendingProposalByUserQuery(Number(id));
  data && console.log(data);

  return(
    <div className={styles['user-submitted']}>
      { !isLoading && (data) &&
        <div className={styles['no-film-submitted']}>
          <p>{data}</p>
          <p>
            Vous n’avez
            <span>&nbsp;pas de proposition de film en attente</span>
            . Une idée? C’est par ici!
          </p>
          <Button
            styleMod='fill'
            href='/proposal'
          >
            Proposer un film
          </Button>
        </div>
      }
      { film &&
        <div className={styles['pending-proposal']}>
          <h2 className={userStyles['title-h2']}>Ma proposition en <span>attente :</span></h2>
          <div className={styles['film']}>
            <h3 className={`${styles['grid-title']} ${userStyles['title-h3']}`}>
              {film.title}
              &nbsp;&#40;{film.releaseDate}&#41;
            </h3>

            <div className={styles['grid-direc']}>
              <h4 className={userStyles['title-h4']}>
                réalisateur{(film.director.length > 1) && 's'}
              </h4>
              <span>
                {film.director.join(', ')}
              </span>
            </div>

            <div className={styles['grid-genre']}>
              <h4 className={userStyles['title-h4']}>
              genre{(film.genres.length > 1) && 's'}
              </h4>
              <span>
                {film.genres.join(', ')}
              </span>
            </div>

            <div className={styles['grid-pDate']}>
              <h4 className={userStyles['title-h4']}>
                date de
                <span>&nbsp;publication :</span>
                <span className={styles['publish-date']}>&nbsp;{film.publishDate}</span>
              </h4>
            </div>

            <div className={`${styles['grid-cover']} ${styles['cover']}`}>
              <img src={film.cover} alt='Affiche du film' />
            </div>
          </div>
          <Button
            styleMod='fill'
          >
            Modifier ma proposition
          </Button>
        </div>
      }
    </div>
  );
}

export default UserSubmittedFilm;