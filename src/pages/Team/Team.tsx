import { useState } from 'react';
import { ReactComponent as LinkedIn } from './ico/linkedin.svg';
import styles from './Team.module.scss';

function Team() {
  const [zoomedBenouit, setZoomedBenouit] = useState('/images/team/benoit.png');
  const [roleBenouit, setRoleBenouit] = useState('Front Dev');
  return (
    <section className={styles.team}>
      <h1 className={styles.title}>L'équipe</h1>
      <div className={styles.pictures}>
        <div className={styles.row}>
          <div className={styles.card}>
            <img className={styles.img} src='/images/team/julien.jpg' alt='Julien' />
            <p className={styles.name}>Julien GOLETTO</p>
            <p className={styles.role}>Product Owner / Lead Back</p>
            <a href='https://www.linkedin.com/in/julien-goletto-a589a2203/' target={'_blank'} rel='noreferrer' className={styles.link}><LinkedIn /></a>
          </div>
          <div className={styles.card}>
            <img className={styles.img} src='/images/team/joffrey.jpg' alt='Joffrey' />
            <p className={styles.name}>Joffrey D'ORTOLI</p>
            <p className={styles.role}>Devops / Infra</p>
            <a href='https://www.linkedin.com/in/joffreydortoli/' target={'_blank'} rel='noreferrer' className={styles.link}><LinkedIn /></a>
          </div>
          <div className={styles.card}>
            <img className={styles.img} src='/images/team/anthony.png' alt='Anthony' />
            <p className={styles.name}>Anthony ESPIRAT</p>
            <p className={styles.role}>Designer / Lead Front</p>
            <a href='https://www.linkedin.com/in/anthony-espirat/' target={'_blank'} rel='noreferrer' className={styles.link}><LinkedIn /></a>
          </div>
          <div className={styles.card}>
            <img className={styles.img}
              onMouseEnter={() => {setZoomedBenouit('/images/team/benoitzoomed.png');}}
              onMouseLeave={() => {setZoomedBenouit('/images/team/benoit.png');}}
              src={zoomedBenouit}
              alt='Benoit' />
            <p className={styles.name}>Gregory MICHALAK</p>
            <p className={styles.role} 
              onMouseEnter={() => {setRoleBenouit('Front Dev / Troll Master');}}
              onMouseLeave={() => {setRoleBenouit('Front Dev');}}
            >{roleBenouit}</p>
            <a href='https://www.linkedin.com/in/gregory-michalak-b1613b22a/' target={'_blank'} rel='noreferrer' className={styles.link}><LinkedIn /></a>
          </div>
          <div className={styles.card}>
            <img className={styles.img} src='/images/team/gino.jpg' alt='Gino' />
            <p className={styles.name}>Gino SALOME</p>
            <p className={styles.role}>Front Dev / Git master</p>
            <a href='https://www.linkedin.com/in/gino-salom%C3%A9-0a10ba139/' target={'_blank'} rel='noreferrer' className={styles.link}><LinkedIn /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;