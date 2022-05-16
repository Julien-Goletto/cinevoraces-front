import { useAllMetricsQuery } from 'redux/api';
import styles from './Metrics.module.scss';

function Metrics() {
  const { data , isLoading } = useAllMetricsQuery<Metrics>();
  
  if (!isLoading) {
    return (
      <section className={styles.metrics}>
        <h3 className={styles.title}>CinéVoraces en quelques chiffres</h3>
        <div className={styles.grid}>
          <div className={`${styles.metric} ${styles['metric--purple']}`}>
            <span className={styles.count}>{data.seasons_count}</span>
            <span className={styles.type}>Saisons</span>
          </div>
          <div className={`${styles.metric} ${styles['metric--yellow']}`}>
            <span className={styles.count}>{data.movies_count}</span>
            <span className={styles.type}>Films</span>
          </div>
          <div className={`${styles.metric} ${styles['metric--green']}`}>
            <span className={styles.count}>{data.countries_count}</span>
            <span className={styles.type}>Pays</span>
          </div>
        </div>
      </section>
    );
  } else return null;
};

export default Metrics;