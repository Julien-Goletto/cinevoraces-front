import Button from 'components/Buttons/Button';
import styles from './Hero.module.scss';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h1 className={styles.title}>Bienvenue dans le <span>ciné-club</span> virtuel !</h1>
        <p className={styles.subtitle}>Chaque semaine, un film à découvrir</p>
        <div className={styles.btns}>
          <Button state='full'>Découvrir un film</Button>
          <Button state='empty'>S'inscrire</Button>
        </div>
      </div>
      <div className={styles.img}>
        <img src='images/hero-img.jpg' alt='Affiche de films' />
      </div>
    </section>
  );
}

export default Hero;