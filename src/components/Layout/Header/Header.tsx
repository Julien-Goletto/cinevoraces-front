import styles from './Header.module.scss';

function Header() {
  return(
    <header className={`container ${styles.header}`}>
      <div className={styles.header__logo}>
        <button className={styles['header__nav-mobile']}>
          <img src='images/mobile_menu.svg' alt='' />
        </button>
        <img src='images/logo_title.svg' alt='Logo du site' />
      </div>
      <nav className={styles.header__nav}>
        <a href='#' className={styles.link}>Accueil</a> 
        <div className={styles.dot}></div>
        <a href='#' className={styles.link}>Les films</a>
        <div className={styles.dot}></div>
        <a href='#' className={styles.link}>Le dernier film</a>
      </nav>

      {/* // TODO : Use Button component */}
      <button style={{
        height: '2.75rem',
        width: '7.75rem',
        margin: 0,
        right: 0,
      }}
      >Se connecter</button>
    </header>
  );
}

export default Header;