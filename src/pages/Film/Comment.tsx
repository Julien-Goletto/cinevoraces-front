import styles from './Comment.module.scss';
import StarRating from 'components/StarRating/StarRating';

const fake_data: {[key:string]: string} =
  { 
    pic: 'fake_data/pictures/profilpic.png',
  };

function Comment() {
  return (
    <div className={styles.comment}>
      <div className={styles.profil}>
        <div className={styles.picture}><img src={fake_data.pic} alt='Avatar' className={styles.pic} /></div>
        <div className={styles.box}>
          <h5 className={styles.name}>Wade Warren</h5>
          <div className={styles.date}>Le 7 février 2022</div>
        </div>
      </div>
      <div className={styles.note}><StarRating state='secondary'/></div>
      <p className={styles.text}>
      Le film commence fort, avec une belle baston reprenant les bruits typiques d’un Bud Spencer et Terence Hill, avec l’air de musique de la Cantina de Star Wars, hilarité totale pour ma part ! Par la suite, j’ai finalement trouvé la musique assez bonne, variée, rythmée et originale. Les chants et chorégraphie sympa (même si j’en ai passés certains vers la fin en accélérée). Les cascades improbables m’ont...
        <button className={styles.more}>Voir plus</button>
      </p>
    </div>
  );
};

export default Comment;