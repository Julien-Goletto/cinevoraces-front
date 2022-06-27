import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLastMovieQuery } from 'redux/api';
import styles from './MenuMobile.module.scss';

/**
 * @returns Mobile menu
 */
function MenuMobile() {
  const {data} = useLastMovieQuery();
  const lastMoviePath = `film/${data ? data[0].id : ''}`;
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <>
      <button onClick={handleMobileMenu} className={styles['nav-mobile']}>
        <img src='/images/mobile_menu.svg' alt='' />
      </button>
      {mobileMenu &&
      <nav className={styles.nav}>
        <ul className={styles.links}>
          <li className={styles.link}>
            <Link to='/' onClick={handleMobileMenu}>
              Accueil
            </Link>
          </li>
          <li className={styles.link}>
            <Link to='/films' onClick={handleMobileMenu}>
              Les films
            </Link>
          </li>
          <li className={styles.link}>
            <Link to={lastMoviePath} className={styles.link}>
              Le dernier film
            </Link>
          </li>
        </ul>
      </nav>}
    </>
  );
}

export default MenuMobile;