import styles from './Home.module.scss';
import Hero from './Hero/Hero';
import LastMoviesGrid from 'components/LastMoviesGrid/LastMoviesGrid';
import Metrics from 'components/Metrics/Metrics';
import About from './About/About';
import SendMovie from './About/SendMovie/SendMovie';
import Share from './About/Share/Share';

function Home() {
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
      
    </>
  );
};

export default Home; 