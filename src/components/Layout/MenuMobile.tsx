import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useLastMovieQuery } from 'redux/api';
import { globalState, toggleMobileMenu } from 'redux/slices/global';
import styles from './MenuMobile.module.scss';

/**
 * @returns Mobile menu
 */
function MenuMobile() {
  const dispatch = useAppDispatch();
  const {mobileIsOpen} = useAppSelector(globalState);
  const {data} = useLastMovieQuery();
  const lastMoviePath = `film/${data ? data[0].id : ''}`;

  const handleToggle = () => {
    dispatch(toggleMobileMenu());
  };

  return (
    <>
      <button onClick={handleToggle} className={styles['nav-mobile']}>
        <img src='/images/mobile_menu.svg' alt='' />
      </button>
      {mobileIsOpen &&
      <nav className={styles.nav}>
        <ul className={styles.links}>
          <li className={styles.link}>
            <Link to='/' onClick={handleToggle}>
              Accueil
            </Link>
          </li>
          <li className={styles.link}>
            <Link to='/films' onClick={handleToggle}>
              Les films
            </Link>
          </li>
          <li className={styles.link}>
            <Link to={lastMoviePath} className={styles.link} onClick={handleToggle}>
              Le dernier film
            </Link>
          </li>
        </ul>
      </nav>}
    </>
  );
}

export default MenuMobile;