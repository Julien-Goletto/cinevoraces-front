import Connection from 'components/Modal/Connection/Connection';
import Modal from 'components/Modal/Modal';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleConnection } from 'redux/slices/global';
import styles from './Header.module.scss';
import MenuMobile from './MenuMobile/MenuMobile';
import UserMenu from './UserMenu/UserMenu';

// TODO : Use Redux
const isLogged = true;

function Header() {
  const dispatch = useAppDispatch();
  const connectionIsOpen = useAppSelector(state => state.global.connectionIsOpen );
  return(
    <>
      { connectionIsOpen && 
      <Modal>
        <Connection />
      </Modal>
      }
      <header className={`container ${styles.header}`}>
        <div className={styles.logo}>
          <MenuMobile />
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
            <button onClick={() => dispatch(toggleConnection()) } style={{
              height: '2.75rem',
              width: '7.75rem',
              margin: 0,
              right: 0,
            }}>Se connecter</button>
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