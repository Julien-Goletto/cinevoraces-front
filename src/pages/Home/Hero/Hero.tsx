import Button from 'components/Buttons/Button';
import styles from './Hero.module.scss';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__text}>
        <h1 className={styles.hero__title}>Bienvenue dans le <span>ciné-club</span> virtuel !</h1>
        <p className={styles.hero__subtitle}>Chaque semaine, un film à découvrir</p>
        <div className={styles.hero__btns}>
          <Button state='full'>Découvrir un film</Button>
          <Button state='empty'>S'inscrire</Button>
        </div>
      </div>
      <div className={styles.hero__img}>
        <img src='images/hero-img.jpg' alt='Affiche de films' />
      </div>
    </section>
  );
}

export default Hero;