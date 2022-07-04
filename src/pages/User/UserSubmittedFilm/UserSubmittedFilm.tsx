import { usePendingProposalByUserQuery } from 'redux/api';
import { Button } from 'components/Inputs/InputsLib';
import userStyles from '../User.module.scss';
import styles from './UserSubmittedFilm.module.scss';
import { useEffect } from 'react';

function UserSubmittedFilm({ id }: {id: string}) {
  const { data, isLoading } = usePendingProposalByUserQuery(Number(id));
  let dataResponseTest = false;
  if (data) {
    // FIXME: Response should send an empty array instead of string
    // @ts-expect-error
    if (data === 'Cet utilisateur n\'a pas de proposition de film en attente.') { 
      dataResponseTest = false;
    } else {
      dataResponseTest = true;
    }
  }

  useEffect(() => {console.log(data);}, [data]);

  return(
    <div className={styles['user-submitted']}>
      { !isLoading && !dataResponseTest &&
        <div className={styles['no-film-submitted']}>
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
      { !isLoading && typeof data !== 'string' &&
        <div className={styles['pending-proposal']}>
          <h2 className={userStyles['title-h2']}>Ma proposition en <span>attente :</span></h2>
          <div className={styles['film']}>
            <h3 className={`${styles['grid-title']} ${userStyles['title-h3']}`}>
              {data![0].french_title}
              &nbsp;&#40;{data![0].release_date.slice(0,4)}&#41;
            </h3>

            <div className={styles['grid-direc']}>
              <h4 className={userStyles['title-h4']}>
                réalisateur{(data![0].directors.length > 1) && 's'}
              </h4>
              <span>
                {data![0].directors.join(', ')}
              </span>
            </div>

            <div className={styles['grid-genre']}>
              <h4 className={userStyles['title-h4']}>
              genre{(data![0].genres.length > 1) && 's'}
              </h4>
              <span>
                {data![0].genres.join(', ')}
              </span>
            </div>

            <div className={styles['grid-pDate']}>
              <h4 className={userStyles['title-h4']}>
                date de
                <span>&nbsp;publication :</span>
                <span className={styles['publish-date']}>&nbsp;{(data![0].publishing_date).slice(0,10)}</span>
              </h4>
            </div>

            <div className={`${styles['grid-cover']} ${styles['cover']}`}>
              <img src={data![0].poster_url} alt='Affiche du film' />
            </div>
          </div>
          {/* <Button
            styleMod='fill'
          >
            Modifier ma proposition
          </Button> */}
        </div>
      }
    </div>
  );
}

export default UserSubmittedFilm;