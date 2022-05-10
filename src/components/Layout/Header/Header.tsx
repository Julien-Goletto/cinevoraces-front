import { Button } from 'components/Buttons/Button';
import Connection from 'components/Modal/Connection/Connection';
import Modal from 'components/Modal/Modal';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleConnection } from 'redux/slices/global';
import styles from './Header.module.scss';
import MenuMobile from './MenuMobile/MenuMobile';
import UserMenu from './UserMenu/UserMenu';

// TODO : Use Redux
const isLogged = false;

function Header() {
  const dispatch = useAppDispatch();
  const connectionIsOpen = useAppSelector(state => state.global.connectionIsOpen );
  const connectionHandler = () => {
    dispatch(toggleConnection());
  };
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
          <a href='/' className={styles.link}>Accueil</a> 
          <div className={styles.dot}></div>
          <a href='/films' className={styles.link}>Les films</a>
          <div className={styles.dot}></div>
          <a href='/' className={styles.link}>Le dernier film</a>
        </nav>

        {!isLogged &&
          <>
            <Button
              styleMod='fill'
              handler={connectionHandler}
            >
              Se connecter
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