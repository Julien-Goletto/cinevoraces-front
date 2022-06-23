import React from 'react';
import { useAppDispatch} from 'redux/hooks';
import { setDescription } from 'redux/slices/proposal';
import styles from './Description.module.scss';

function Description() {
  const dispatch = useAppDispatch();
  const handlePresentation = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setDescription(e.target?.value));
  };

  return (
    <section className={styles.description}>
      <h2 className={styles.title}>Motivez votre choix</h2>
      <p className={styles.text}>Décrivez aux utilisiteurs pourquoi vous proposez <span>ce film</span>.</p>
      <textarea onChange={handlePresentation} placeholder='Decrire votre avis sur le film' className={styles.input} name='description' rows={12} maxLength={1200}></textarea>
    </section>
  );
}
export default Description;
