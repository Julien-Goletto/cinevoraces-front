import LastMoviesGrid from 'components/LastMoviesGrid/LastMoviesGrid';
import { useLocation } from 'react-router-dom';
import styles from './Error.module.scss';

function Error() {
  const { pathname } = useLocation();
  return(
    <>
      <section className={`${styles.error} container`}>
        <div>
          <div className={styles.title}>
            <img className={styles.img} src='images/error_icon.svg' alt='' />
            <h1>Erreur 404</h1>
          </div>
          <div className={styles.subtitle}>C'est cassé chef...</div>
        </div>
        <p className={styles.body}>
          L&apos;URL <span className={styles.pathname}>{pathname}</span> n&apos;a rien donné.
          <br /> Essayez d'ouvrir les yeux en tapant votre requête.
        </p>

        {/* // TODO : Use Button component */}
        <button style={{
          height: '2.5rem',
          width: 'fit-content',
          margin: 'auto',
          display: 'block'
        }}
        >Retourner à l'acceuil</button>
      </section>
      <LastMoviesGrid/>
    </>
  );
}

export default Error;