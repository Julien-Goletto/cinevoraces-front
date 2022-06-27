import { ReactComponent as SVGLogo } from './Layout.Logo.svg';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

/**
 * @returns App Footer 
 */
function Footer() {
  return(
    <div className={styles.footer}>
      <footer className={styles.footer}>
        <SVGLogo/>
        <div className={styles.links}>
          <Link to='/team' className={styles.link}>L'équipe</Link>
        </div>
        <div className={styles.copyright}>© Tout droit réservé - 2022</div>
      </footer>
    </div>
  );
}

export default Footer;