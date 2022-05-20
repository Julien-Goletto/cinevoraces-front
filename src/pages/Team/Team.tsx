import styles from './Team.module.scss';
import { useState } from 'react';

function Team() {

  const [zoomedBenouit, setZoomedBenouit] = useState('/images/team/benoit.png');
  
  return (
    <section className={styles.team}>
      <h1 className={styles.title}>L'équipe</h1>
      <div className={styles.pictures}>
        <div className={styles.row}>
          <div className={styles.card}>
            <a href='https://www.linkedin.com/in/julien-goletto-a589a2203/' target={'_blank'} rel='noreferrer'>
              <img className={styles.img} src='/images/team/julien.jpg' alt='Julien' />
            </a>
            <p className={styles.name}>Julien GOLETTO</p>
          </div>
          <div className={styles.card}>
            <a href='https://www.linkedin.com/in/joffreydortoli/' target={'_blank'} rel='noreferrer'>
              <img className={styles.img} src='/images/team/joffrey.jpg' alt='Joffrey' />
            </a>
            <p className={styles.name}>Joffrey D'ORTOLI</p>
          </div>
          <div className={styles.card}>
            <a href='https://www.linkedin.com/in/anthony-espirat/' target={'_blank'} rel='noreferrer'>
              <img className={styles.img} src='/images/team/anthony.png' alt='Anthony' />
            </a>
            <p className={styles.name}>Anthony ESPIRAT</p>
          </div>
          <div className={styles.card}>
            <a href='https://www.linkedin.com/in/gregory-michalak-b1613b22a/' target={'_blank'} rel='noreferrer'>
              <img className={styles.img}
                onMouseEnter={() => {setZoomedBenouit('/images/team/benoitzoomed.png')}}
                onMouseLeave={() => {setZoomedBenouit('/images/team/benoit.png')}}
                src={zoomedBenouit}
                alt='Benoit' />
            </a>
            <p className={styles.name}>Gregory MICHALAK</p>
          </div>
          <div className={styles.card}>
            <a href='https://www.linkedin.com/in/gino-salom%C3%A9-0a10ba139/' target={'_blank'} rel='noreferrer'>
              <img className={styles.img} src='/images/team/gino.jpg' alt='Gino' />
            </a>
            <p className={styles.name}>Gino SALOME</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;