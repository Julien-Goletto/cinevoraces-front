import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

function Footer() {
  return(
    <div className={styles.upper}>
      <footer className={styles.footer}>
        <img className={styles.img} src='/images/logo_title.svg' alt='Logo du site' />
        <div className={styles.links}>
          {/* TODO: Issue #61 - #62 */}
          {/* <Link to='' className={styles.link}>Politique de confidentialité</Link> */}
          <Link to='/team' className={styles.link}>L'équipe</Link>
        </div>
        <div className={styles.copyright}>© Aucun droit réservé - 2022</div>
      </footer>
    </div>
  );
}

export default Footer;