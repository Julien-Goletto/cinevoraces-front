import LastMoviesGrid from 'components/LastMoviesGrid/LastMoviesGrid';
import { Button } from 'components/Inputs/InputsLib';
import { useLocation } from 'react-router-dom';
import styles from './Error.module.scss';
import AnimationLayout from 'components/AnimationRouter';

function Error({ errorNum = 404, }: ErrorPage) {
  const { pathname } = useLocation();

  return(
    <AnimationLayout>
      <section className={styles.error}>
        <div>
          <div className={styles.title}>
            <img className={styles.img} src='/images/error_icon.svg' alt='' />
            <h1>
              Erreur&nbsp;
              {errorNum}
            </h1>
          </div>
          <div className={styles.subtitle}>
            { errorNum === 404 && 'Mais on est où là..?'} 
            { errorNum === 401 && 'Comment est-ce que vous êtes arrivé ici?'} 
          </div>
        </div>
        { (errorNum === 404) &&
          <p className={styles.body}>
            L&apos;URL <span className={styles.pathname}>{pathname}</span> n&apos;a rien donné.
            <br /> Essayez d'ouvrir les yeux en tapant votre requête.
          </p> }
        { (errorNum === 401) &&
          <p className={styles.body}>
            Vous devez être connecté à un compte utilisateur pour acceder à l&apos;URL <span className={styles.pathname}>{pathname}</span>.
            <br /> Pas encore membre? <span className={styles.pathname}>Inscrivez-vous!</span>

          </p> }

        { (errorNum === 401) ?
          <Button href='/register'>
            S'inscrire
          </Button>
          :
          <Button styleMod='rounded' href='/'>
            Retourner à l'acceuil
          </Button> }
      </section>
      <div className={styles['last-movies']}>
        <LastMoviesGrid/>
      </div>
    </AnimationLayout>
  );
}

export default Error;