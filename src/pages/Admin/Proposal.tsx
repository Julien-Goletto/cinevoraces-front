import { Button } from 'components/Buttons/Button';
import AdminModal from './AdminModal';
import styles from './Admin.module.scss';
import { useState } from 'react';

function Proposal ({movie}: {[key: string]: any}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleModal = (e: any) => {
    e.preventDefault();
    setModalIsOpen(!modalIsOpen);
  };

  return(
    <>
      { modalIsOpen &&
        <AdminModal
          handler={handleModal}
        >
          {movie.presentation}
        </AdminModal>
      }
      <div className={styles['proposal-container']}>
        <div className={styles['film-info']}>
          <div className={styles['title']}>
            {movie.french_title}
          </div>
          <div>
            {movie.publishing_date}
          </div>
          <div>
            {movie.user_pseudo}
          </div>
          <Button
            styleMod='rounded'
            handler={handleModal}
          >Présentation</Button>
        </div>
        <div className={styles['cover']}>
          <img src='https://image.tmdb.org/t/p/original/qjyqR1KkGmHPNs4zA4KICDWSxfX.jpg' alt=''/>
        </div>
      </div>
    </>
  );
};

export default Proposal;