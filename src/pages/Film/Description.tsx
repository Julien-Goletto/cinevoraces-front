import styles from './Description.module.scss';
import StarRating from './StarRating';

const fake_data: {[key:string]: string} =
  { 
    title: 'Jawas',
    year: '2012', 
    maker: 'John The Doe', 
    type: 'Action', 
    country: 'Etats Unis', 
    runtime: '128min', 
    cast:'Toto Mollande',
  };

function Description() {
  return (
    <div className={styles.description}>
      <h1 className={styles.title}>{fake_data.title}<span className={styles.year}>({fake_data.year})</span></h1>
      <div className={`${styles.element} ${styles['element--flex']}`}>
          Note des membres :
        <span className={styles.star}><StarRating state='primary'/></span> 
      </div>
      <div className={`${styles.element} ${styles['element--flex']}`}>
          Ma note :
        <span className={styles.star}><StarRating state='secondary'/></span> 
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
  );
};

export default Description;