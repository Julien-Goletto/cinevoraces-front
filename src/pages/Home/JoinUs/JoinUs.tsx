import { Button } from 'components/Buttons/Button';
import styles from './JoinUs.module.scss';

function JoinUs() {
  return (
    <section className={styles.join}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <span>Rejoignez-nous.</span>
          <span>Régalez-vous.</span>
          <span>Régalez-nous</span>
        </div>
        <Button
          href='/register'
          styleMod='fill'
        >
          S'inscrire
        </Button>
      </div>

    </section>
  );
}

export default JoinUs;