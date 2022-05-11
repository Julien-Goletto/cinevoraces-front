import styles from './Metrics.module.scss';

function Metrics() {
  return (
    <section className={styles.metrics}>
      <h3 className={styles.title}>CinéVoraces en quelques chiffres</h3>
      <div className={styles.grid}>
        <div className={`${styles.metric} ${styles['metric--purple']}`}>
          <span className={styles.count}>3</span>
          <span className={styles.type}>Saisons</span>
        </div>
        <div className={`${styles.metric} ${styles['metric--yellow']}`}>
          <span className={styles.count}>170</span>
          <span className={styles.type}>Films</span>
        </div>
        <div className={`${styles.metric} ${styles['metric--green']}`}>
          <span className={styles.count}>36</span>
          <span className={styles.type}>Pays</span>
        </div>
      </div>
    </section>
  );
}

export default Metrics;