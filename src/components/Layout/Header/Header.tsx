import { ReactComponent as SVGLogo } from '../Layout.Logo.svg';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleModal, globalState } from 'redux/slices/global';
import { userLogged } from 'redux/slices/user';
import { useLastMovieQuery } from 'redux/api';
import { Button } from 'components/Inputs/InputsLib';
import { Link } from 'react-router-dom';
import Connection from 'components/Connection/Connection';
import Modal from 'components/Modal/Modal';
import MenuMobile from './MenuMobile/MenuMobile';
import UserMenu from './UserMenu/UserMenu';
import styles from './Header.module.scss';

/**
 * @returns App header
 */
function Header() {
  const dispatch = useAppDispatch();
  const {data} = useLastMovieQuery();
  const {modalIsOpen} = useAppSelector(globalState);
  const {isOnline} = useAppSelector(userLogged);

  const connectionHandler = () => {
    dispatch(toggleModal());
  };

  return(
    <>
      {modalIsOpen && 
      <Modal>
        <Connection/>
      </Modal>}

      <header className={styles.header}>
        <div className={styles.logo}>
          <MenuMobile />
          <Link to='/'>
            <SVGLogo/>
          </Link> 
        </div>
        <nav className={styles.nav}>
          <Link to='/' className={styles.link}>Accueil</Link> 
          <div className={styles.dot}></div>
          <Link to='films' className={styles.link}>Films</Link> 
          <div className={styles.dot}></div>
          <Link to={`film/${data ? data[0].id : ''}`} className={styles.link}>Le dernier film</Link>
        </nav>

        {!isOnline &&
          <>
            <Button styleMod='fill' handler={connectionHandler}>
              <span className={styles['desktop-sentence']}>Se connecter</span>
              <span className={styles['mobile-sentence']}>Connexion</span>
            </Button>
          </>
        }
        {isOnline &&
        <>
          <UserMenu />
        </>
        }
      </header>
    </>
  );
}

export default Header;