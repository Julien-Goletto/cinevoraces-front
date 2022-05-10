import ButtonActions from 'components/Buttons/ButtonActions';
import styles from './Description.module.scss';

function Description() {
  return (
    <section className={styles.description}>
      <h2 className={styles.title}>Motivez votre choix</h2>
      <p className={styles.text}>Décrivez aux utilisiteurs pourquoi vous proposez <span>ce film</span>.</p>
      <textarea placeholder='Decrire votre avis sur le film' className={styles.input} name='description' rows={12} maxLength={1200}></textarea>
      <div className={styles.button}>
        <ButtonActions state='full'>Envoyer</ButtonActions>
      </div>
    </section>
  );
}
export default Description;
