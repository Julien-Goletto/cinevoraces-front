import { Button } from 'components/Inputs/InputsLib';
import Connection from 'components/Modal/Connection/Connection';
import Modal from 'components/Modal/Modal';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleModal, globalState } from 'redux/slices/global';
import { isOnline } from 'redux/slices/user';
import styles from './Header.module.scss';
import MenuMobile from './MenuMobile/MenuMobile';
import UserMenu from './UserMenu/UserMenu';
import { Link } from 'react-router-dom';
import { useLastMovieQuery } from 'redux/api';

function Header() {
  const dispatch = useAppDispatch();
  const {data} = useLastMovieQuery();
  const {modalIsOpen} = useAppSelector(globalState);
  const connectionHandler = () => {
    dispatch(toggleModal());
  };
  const isLogged = useAppSelector<boolean>(isOnline);
  

  return(
    <>
      { modalIsOpen && 
      <Modal>
        <Connection />
      </Modal>
      }
      <header className={styles.header}>
        <div className={styles.logo}>
          <MenuMobile />
          <Link to='/'>
            <img className={styles.img} src='/images/logo_title.svg' alt='Logo du site' />
          </Link> 
        </div>
        <nav className={styles.nav}>
          <Link to='/' className={styles.link}>Accueil</Link> 
          <div className={styles.dot}></div>
          <Link to='films' className={styles.link}>Films</Link> 
          <div className={styles.dot}></div>
          <Link to={`film/${data ? data[0].id : ''}`} className={styles.link}>Le dernier film</Link>
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