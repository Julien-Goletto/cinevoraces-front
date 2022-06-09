import { useAppSelector } from 'redux/hooks';
import { isOnline } from 'redux/slices/user';
import Hero from './Hero/Hero';
import LastMoviesGrid from 'components/LastMoviesGrid/LastMoviesGrid';
import Metrics from 'components/Metrics/Metrics';
import About from './About/About';
import SendMovie from './About/SendMovie/SendMovie';
import Share from './About/Share/Share';
import JoinUs from './JoinUs/JoinUs';
import AnimationLayout from 'components/AnimationRouter';
import styles from './Home.module.scss';

function Home() {
  const isLogged = useAppSelector<boolean>(isOnline);
  return (
    <AnimationLayout>
      <Hero />
      <section className={styles.movies}>
        <LastMoviesGrid />
      </section>
      <Metrics />
      <About>
        <SendMovie />
        <Share />
      </About>
      { !isLogged && <JoinUs />}
    </AnimationLayout>
  );
};

export default Home; 