import { Button } from 'components/Buttons/Button';
import Connection from 'components/Modal/Connection/Connection';
import Modal from 'components/Modal/Modal';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleConnection } from 'redux/slices/global';
import { isOnline } from 'redux/slices/user';
import styles from './Header.module.scss';
import MenuMobile from './MenuMobile/MenuMobile';
import UserMenu from './UserMenu/UserMenu';
import { Link } from 'react-router-dom';

function Header() {
  const dispatch = useAppDispatch();
  const connectionIsOpen = useAppSelector(state => state.global.connectionIsOpen);
  const connectionHandler = () => {
    dispatch(toggleConnection());
  };
  const isLogged = useAppSelector<boolean>(isOnline);
  return(
    <>
      { connectionIsOpen && 
      <Modal>
        <Connection />
      </Modal>
      }
      <header className={styles.header}>
        <div className={styles.logo}>
          <MenuMobile />
          <img className={styles.img} src='/images/logo_title.svg' alt='Logo du site' />
        </div>
        <nav className={styles.nav}>
          <Link to='/' className={styles.link}>Accueil</Link> 
          <div className={styles.dot}></div>
          <Link to='films' className={styles.link}>Films</Link> 
          <div className={styles.dot}></div>
          {/* // TODO: ROUTE LAST MOVIE */}
          <Link to='/' className={styles.link}>Le dernier film</Link>
        </nav>

        {!isLogged &&
          <>
            <Button
              styleMod='fill'
              handler={connectionHandler}
            >
              <span className={styles['desktop-sentence']}>Se connecter</span>
              <span className={styles['mobile-sentence']}>Connexion</span>
            </Button>
          </>
        }
        {isLogged &&
        <>
          <UserMenu />
        </>
        }
      </header>
    </>
  );
}

export default Header;