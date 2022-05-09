import styles from './Metrics.module.scss';

function Metrics() {
  return (
    <section className={styles.metrics}>
      <h3 className={styles.metrics__title}>CinéVoraces en quelques chiffres</h3>
      <div className={styles.metrics__grid}>
        <div className={`${styles.metric} ${styles['metric--purple']}`}>
          <span className={styles.metric__count}>3</span>
          <span className={styles.metric__type}>Saisons</span>
        </div>
        <div className={`${styles.metric} ${styles['metric--yellow']}`}>
          <span className={styles.metric__count}>170</span>
          <span className={styles.metric__type}>Films</span>
        </div>
        <div className={`${styles.metric} ${styles['metric--green']}`}>
          <span className={styles.metric__count}>36</span>
          <span className={styles.metric__type}>Pays</span>
        </div>
      </div>
    </section>
  );
}

export default Metrics;