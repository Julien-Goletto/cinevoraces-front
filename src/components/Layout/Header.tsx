import { useEffect, useState } from 'react';
import { ReactComponent as SVGLogo } from './Layout.Logo.svg';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleModal, globals } from 'redux/slices/global';
import { userState } from 'redux/slices/user';
import { useLastMovieQuery } from 'redux/api';
import { Button } from 'components/Inputs/InputsLib';
import { Link } from 'react-router-dom';
import Connection from 'components/Connection/Connection';
import Modal from 'components/Modal/Modal';
import MenuMobile from './MenuMobile';
import UserMenu from './UserMenu';
import styles from './Header.module.scss';

/**
 * @returns App header
 */
function Header() {
  const dispatch = useAppDispatch();
  const {data: lastMovieData} = useLastMovieQuery();
  const [lastMoviePath, setLastMoviePath] = useState('');
  const {modalIsOpen} = useAppSelector(globals);
  const {isOnline} = useAppSelector(userState);

  const connectionHandler = () => {
    dispatch(toggleModal());
  };

  useEffect(() => {
    lastMovieData && setLastMoviePath(`film/${lastMovieData.id}`);
  }, [lastMovieData]);

  return(
    <>
      {modalIsOpen && 
      <Modal>
        <Connection/>
      </Modal>}
      <header className={styles.header}>
        <div className={styles.logo}>
          <MenuMobile />
          <Link to='/'><SVGLogo/></Link> 
        </div>
        <nav className={styles.nav}>
          <Link to='/' className={styles.link}>Accueil</Link> 
          <div className={styles.dot}></div>
          <Link to='films' className={styles.link}>Films</Link> 
          <div className={styles.dot}></div>
          <Link to={lastMoviePath} className={styles.link}>Le dernier film</Link>
        </nav>
        {!isOnline &&
          <Button styleMod='fill' handler={connectionHandler}>
            <span className={styles['desktop-sentence']}>Se connecter</span>
            <span className={styles['mobile-sentence']}>Connexion</span>
          </Button>}
        {isOnline && <UserMenu />}
      </header>
    </>
  );
}

export default Header;