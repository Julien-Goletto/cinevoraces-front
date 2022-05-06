import Interactions from 'components/Interactions/Interactions';
import styles from './Movie.module.scss';

const fake_data: {[key:string]: string} =
  { 
    title: 'Jawas', 
    cover: 'fake_data/covers/cover_1.jpg', 
    year: '2012', 
    maker: 'John The Doe', 
    type: 'Action', 
    country: 'Etats Unis', 
    runtime: '128min', 
    cast:'Toto Mollande',
  };

function Movie() {
  return (
    <section className={`${styles.movie} container`}>
      <div className={styles.content}>
        <div className={styles.poster}><img src={fake_data.cover} alt={fake_data.title} className={styles.img} /></div>
        <div className={styles.interactions}>
          <Interactions type='bookmark' count={0}/>
          <Interactions type='view' count={0}/>
          <Interactions type='like' count={0}/>
          <Interactions type='star' count={0}/>
        </div>
      </div>
      <div className={styles.description}>
        <h1 className={styles.title}>{fake_data.title}<span className={styles.year}>({fake_data.year})</span></h1>
        <div className={styles.element}>
          Note des membres
          <span className={styles.elm}></span> 
        </div>
        <div className={styles.element}>
          Réalisateur :
          <span className={styles.elm}>{fake_data.maker}</span>
        </div>
        <div className={styles.element}>
          Genre :
          <span className={`${styles.elm} ${styles['elm--orange']}`}>{fake_data.type}</span> 
        </div>
        <div className={styles.element}>
          Pays :
          <span className={`${styles.elm} ${styles['elm--orange']}`}>{fake_data.country}</span>
        </div>
        <div className={styles.element}>
          Durée :
          <span className={`${styles.elm} ${styles['elm--weight']}`}>{fake_data.runtime}</span>
        </div>
        <div className={styles.casting}>
          <span className={styles.cast}>Casting :</span>
          <ul>
            <li className={styles.list}>Ponce</li>
            <li className={styles.list}>Dona</li>
            <li className={styles.list}>Foub</li>
            <li className={styles.list}>Ef Ou Bé</li>
          </ul>
        </div>
      </div>

    </section>
  );
};
/*
        <Interactions type='bookmark' count={0}/>
        <Interactions type='view' count={0}/>
        <Interactions type='like' count={0}/>
        <Interactions type='star' count={0}/>
*/

export default Movie;