import { useLocation } from 'react-router-dom';
import styles from './Error.module.scss';

function Error() {
  const { pathname } = useLocation();
  return(
    <section className={`${styles.error} container`}>
      <div>
        <div className={styles.error__title}>
          <img className={styles.error__img} src='images/error_icon.svg' alt='' />
          <h1>Erreur 404</h1>
        </div>
        <div className={styles.error__subtitle}>C'est cassé chef...</div>
      </div>
      <p className={styles.error__body}>
        L&apos;URL <span className={styles.pathname}>{pathname}</span> n&apos;a rien donné.
        <br /> Essayez d'ouvrir les yeux en tapant votre requête.
      </p>

      {/* // TODO : Use Button component */}
      <button style={{
        height: '2.5rem',
        width: '100%',
        margin: 'auto',
        display: 'block'
      }}
      >Retourner à l'acceuil</button>
    </section>
  );
}

export default Error;