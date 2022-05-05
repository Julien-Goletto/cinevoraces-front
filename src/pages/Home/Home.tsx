import styles from './Home.module.scss';


function Home() {
  return (
    <div className={`${styles.box} container`}>
      <h1 className={styles.box__title}>Coucou</h1>
    </div>
  );
};

export default Home;