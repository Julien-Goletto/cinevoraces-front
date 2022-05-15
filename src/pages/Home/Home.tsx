import styles from './Home.module.scss';
import Hero from './Hero/Hero';
import LastMoviesGrid from 'components/LastMoviesGrid/LastMoviesGrid';
import Metrics from 'components/Metrics/Metrics';
import About from './About/About';
import SendMovie from './About/SendMovie/SendMovie';
import Share from './About/Share/Share';
import JoinUs from './JoinUs/JoinUs';
import { useAppDispatch } from 'redux/hooks';
import { addToast } from 'redux/slices/global';

function Home() {

  const dispatch = useAppDispatch();
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
      <JoinUs />
    </>
  );
};

export default Home; 