import Button from 'components/Buttons/Button';
import styles from './Film.module.scss';

const fake_data: {[key:string]: string} =
  { 
    pic: 'fake_data/pictures/profilpic.png',
  };

function Comment() {
  return (
    <>
      <h3 className={styles.title}>Commentaires (18)</h3>
      <div className={styles.comment}>
        <div className={styles.profil}>
          <div className={styles.picture}><img src={fake_data.pic} alt='Avatar' className={styles.pic} /></div>
          <div className={styles.box}>
            <h5 className={styles.name}>Wade Warren</h5>
            <div className={styles.date}>Le 7 février 2022</div>
          </div>
        </div>
        <div className={styles.note}>****</div>
        <form>
          <label>
            <textarea placeholder='Ajouter un commentaire' className={styles.textarea} />
          </label>
          <div className={styles.submit}>
            <Button state='full'>Poster les modifications</Button>
          </div>
        </form>
        {/* <p className={styles.text}>
        Salut tout le monde ! J'ai longuement hésité concernant le film de la semaine. 12 Hommes en Colère, Equilibrium, The Mist, The Frighteners ou encore le director's cut de Daredevil (ne riez pas trop vite, ce film, loin d'être parfait, a subi une grosse injustice à sa sortie à cause de la prod) auraient pu être proposés mais je reste finalement sur le choix qui s'est imposé initialement : Take Shelter écrit et réalisé par Jeff Nichols, un de mes cinéastes préférés... */}
        {/* <button className={styles.more}>Voir plus</button> */}
        {/* </p> */}
      </div>
    </>
  );
};

export default Comment;