import styles from './SendMovie.module.scss';

function SendMovie() {
  return (
    <section className={styles.send}>
      <div className={styles.wrapper}>
        <h2 className={`${styles['title']} ${styles['title--top']}`}>Chaque semaine, une découverte !</h2>
        <div className={styles.content}>

          <img src='/images/week-movie.png' alt='' className={styles.img} />
          <div className={styles.text}>
            <h2 className={`${styles['title']} ${styles['title--bottom']}`}>Chaque semaine, une découverte !</h2>
            <p style={{marginBottom: '1rem'}}>
            Une fois par semaine, un membre du ciné-club propose un film à la communauté.
            </p>
            <p>
            Plus un film est disponible, plus il sera regardé. Surprenez - nous, mais ne négligez pas l’accessibilité !
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SendMovie;