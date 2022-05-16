import { useAppSelector } from 'redux/hooks';
import { isOnline } from 'redux/slices/user';
import styles from './Home.module.scss';
import Hero from './Hero/Hero';
import LastMoviesGrid from 'components/LastMoviesGrid/LastMoviesGrid';
import Metrics from 'components/Metrics/Metrics';
import About from './About/About';
import SendMovie from './About/SendMovie/SendMovie';
import Share from './About/Share/Share';
import JoinUs from './JoinUs/JoinUs';

function Home() {
  const isLogged = useAppSelector<boolean>(isOnline);
  return (
    <>
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
    </>
  );
};

export default Home; 