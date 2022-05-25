import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

function Footer() {
  return(
    <div className={styles.upper}>
      <footer className={styles.footer}>
        <img className={styles.img} src='/images/logo_title.svg' alt='Logo du site Cinévoraces' />
        <div className={styles.links}>
          <Link to='/team' className={styles.link}>L'équipe</Link>
        </div>
        <div className={styles.copyright}>© Tout droit réservé - 2022</div>
      </footer>
    </div>
  );
}

export default Footer;