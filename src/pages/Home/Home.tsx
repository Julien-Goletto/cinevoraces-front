import { useAppSelector } from 'redux/hooks';
import { userState } from 'redux/slices/user';
import { Button } from 'components/Inputs/InputsLib';
import LastMoviesGrid from 'components/LastMoviesGrid/LastMoviesGrid';
import Metrics from 'components/Metrics/Metrics';
import Footer from 'components/Layout/Footer';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import styles from './Home.module.scss';

function Home() {
  const {isOnline} = useAppSelector(userState);
  return (
    <AnimationLayout>
      <Hero />
      <LastMoviesGrid />
      <Metrics />
      <About/>
      <Share/>
      {!isOnline && <JoinUs />}
      <Footer/>
    </AnimationLayout>
  );
};


function Hero() {
  const {isOnline} = useAppSelector(userState);
  return (
    <section className={styles.hero}>
      <div className={styles.wrapper}>
        <h1>
          <span>Bienvenue</span> dans votre <span>ciné-club</span> virtuel !
        </h1>
        <p>Chaque semaine, un film à découvrir</p>
        <div className={styles.buttons}>
          <Button href='/films' styleMod='fill'>Découvrir un film</Button>
          {!isOnline && <Button href='/register'>S'inscrire</Button>}
        </div>
      </div>
      <div className={styles['img-wrapper']}>
        <img src='/images/hero-img.jpg' alt='Affiche de films' />
      </div>
    </section>
  );
}

function About() {
  return (
    <section className={styles.about}>
      <div className={styles.wrapper}>
        <h2 className={`${styles['title']} ${styles['title--top']}`}>Chaque semaine, une découverte !</h2>
        <div className={styles.content}>
          <img src='/images/week-movie.png' alt=''/>
          <div className={styles.text}>
            <h2 className={`${styles['title']} ${styles['title--bottom']}`}>Chaque semaine, une découverte !</h2>
            <p style={{marginBottom: '1rem'}}>
            Une fois par semaine, un membre du ciné-club propose un film à la communauté.
            </p>
            <p>
            Plus un film est disponible, plus il sera regardé. Surprenez-nous, mais ne négligez pas l’accessibilité !
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Share() {
  return (
    <section className={styles.share}>
      <div className={styles.text}>
        <h2>Partagez votre dernière découverte</h2>
        <p>
        CinéVoraces est avant tout un site <span>communautaire</span>, rejoignez la communauté et <span>intéragissez</span> avec les films : on veut savoir ce que vous en avez pensé.
        </p>
      </div>
      <img src='/images/dec.jpg' alt=''/>
    </section>
  );
}

function JoinUs() {
  return (
    <section className={styles.join}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <span>Rejoignez-nous.</span>
          <span>Régalez-vous.</span>
          <span>Régalez-nous</span>
        </div>
        <Button href='/register' styleMod='fill'>S'inscrire</Button>
      </div>
    </section>
  );
}

export default Home; 