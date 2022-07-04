import { useAppSelector } from 'redux/hooks';
import { userState } from 'redux/slices/user';
import { Button } from 'components/Inputs/InputsLib';
import styles from './Hero.module.scss';

function Hero() {
  const {isOnline} = useAppSelector(userState);

  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h1 className={styles.title}><span className={styles.bvn}>Bienvenue</span> dans votre <span>ciné-club</span> virtuel !</h1>
        <p className={styles.subtitle}>Chaque semaine, un film à découvrir</p>
        <div className={styles.buttons}>
          <Button
            href='/films' 
            styleMod='fill'
          >
            Découvrir un film
          </Button>
          { !isOnline &&
            <Button
              href='/register'
            >
              S'inscrire
            </Button>
          }
        </div>
      </div>
      <div className={styles.img}>
        <img src='/images/hero-img.jpg' alt='Affiche de films' />
      </div>
    </section>
  );
}

export default Hero;