import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { mobileIsOpen } from 'redux/slices/global';
import styles from './MenuMobile.module.scss';

function MenuMobile() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.global.mobileIsOpen);

  return (
    <>
      <button onClick={()=> {dispatch(mobileIsOpen());}} className={styles['nav-mobile']}>
        <img src='/images/mobile_menu.svg' alt='' />
      </button>
      {isOpen &&
      <nav className={styles.nav}>
        <ul className={styles.links}>
          <li className={styles.link}>
            <Link 
              to='/'
              onClick={()=> {dispatch(mobileIsOpen());}}
            >
              Accueil
            </Link>
          </li>
          <li className={styles.link}>
            <Link 
              to='/films'
              onClick={()=> {dispatch(mobileIsOpen());}}
            >
              Les films
            </Link>
          </li>
          <li className={styles.link}>
            <Link 
              // TODO: ROUTE LAST MOVIE
              to='/'
              onClick={()=> {dispatch(mobileIsOpen());}}
            >
              Le dernier film
            </Link>
          </li>
        </ul>
      </nav>
      }
    </>
  );
}

export default MenuMobile;