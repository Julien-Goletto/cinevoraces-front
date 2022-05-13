import { Button } from 'components/Buttons/Button';
import Connection from 'components/Modal/Connection/Connection';
import Modal from 'components/Modal/Modal';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleConnection } from 'redux/slices/global';
import styles from './Header.module.scss';
import MenuMobile from './MenuMobile/MenuMobile';
import UserMenu from './UserMenu/UserMenu';

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
      <header className={styles.header}>
        <div className={styles.logo}>
          <MenuMobile />
          <img className={styles.img} src='/images/logo_title.svg' alt='Logo du site' />
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