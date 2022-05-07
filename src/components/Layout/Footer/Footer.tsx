import styles from './Footer.module.scss';

function Footer() {
  return(
    <footer className={`container ${styles.footer}`}>
      <img className={styles.img} src='images/logo_title.svg' alt='Logo du site' />
      <div className={styles.links}>
        <a href='#' className={styles.link}>Politique de confidentialité</a>
        <a href='#' className={styles.link}>L'équipe</a>
      </div>
      <div className={styles.copyright}>© Aucun droit réservé - 2022</div>
    </footer>
  );
}

export default Footer;