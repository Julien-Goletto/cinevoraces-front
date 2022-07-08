import LastMoviesGrid from 'components/LastMoviesGrid/LastMoviesGrid';
import { useLocation } from 'react-router-dom';
import { ReactComponent as SVGError } from './Error.error_ico.svg';
import styles from './Error.module.scss';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';

type ErrorProps = {
  error?: any,
  children?: React.ReactNode
};

function Error({error, children}: ErrorProps) {
  const {pathname} = useLocation();
  const errorStatus = `Erreur ${error ? error.status : 404}`;

  return(
    <AnimationLayout>
      <main className={styles.error}>
        <h1><SVGError/>{errorStatus}</h1>
        <div className={styles.content}>
          {!error &&
            <>
              L&apos;URL <span>{pathname}</span> n&apos;a rien donné.
              <br/> Essayez d'ouvrir les yeux en tapant votre requête.
            </>}
          {(error && !children) &&
            <>
              Vous avez forcement fait un truc de travers, on en serait pas là sinon...
            </>}
          {(error && children) && children}
        </div> 
      </main>
      <div className={styles['last-movies']}>
        <LastMoviesGrid/>
      </div>
    </AnimationLayout>
  );
}

export default Error;