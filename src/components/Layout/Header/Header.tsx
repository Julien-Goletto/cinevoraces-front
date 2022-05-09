import styles from './Header.module.scss';

// TODO : Use Redux
const isLogged = false;

function Header() {
  return(
    <header className={`container ${styles.header}`}>
      <div className={styles.logo}>
        <button className={styles['nav-mobile']}>
          <img src='images/mobile_menu.svg' alt='' />
        </button>
        <img className={styles.logo__img} src='images/logo_title.svg' alt='Logo du site' />
      </div>
      <nav className={styles.nav}>
        <a href='#' className={styles.link}>Accueil</a> 
        <div className={styles.dot}></div>
        <a href='#' className={styles.link}>Les films</a>
        <div className={styles.dot}></div>
        <a href='#' className={styles.link}>Le dernier film</a>
      </nav>

      {!isLogged &&
        <>
          {/* // TODO : Use Button component */}
          <button style={{
            height: '2.75rem',
            width: '7.75rem',
            margin: 0,
            right: 0,
          }}>Se connecter</button>
        </>
      }
      {isLogged &&
      <>
        {/* // TODO : Call drop-down menu here */}
        <img className={styles.user} src='images/user_default.svg' alt='' />
      </>
      }
    </header>
  );
}

export default Header;