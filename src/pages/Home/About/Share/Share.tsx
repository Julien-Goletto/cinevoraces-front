import styles from './Share.module.scss';

function Share() {
  return (
    <section className={styles.share}>
      <div className={styles.text}>
        <h2 className={styles.title}>Partagez votre dernière découverte</h2>
        <p>
        CinéVoraces est avant tout un site <span>communautaire</span>, rejoignez la communauté et <span>intéragissez</span> avec les films : on veut savoir ce que vous en avez pensé.
        </p>
      </div>
      <img src='/images/dec.jpg' alt='' className={styles.img} />
    </section>
  );
}

export default Share;