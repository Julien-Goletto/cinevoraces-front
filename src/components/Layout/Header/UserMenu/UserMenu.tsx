import { setOffline, userLogged } from 'redux/slices/user';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { userIsOpen } from 'redux/slices/global';
import styles from './UserMenu.module.scss';

function Menu() {
  const { pseudo, id } = useAppSelector<any>(userLogged);
  const dispatch = useAppDispatch();
  const userMenuHandler = () => {
    dispatch(userIsOpen());
  };
  return (
    <>
      <div 
        className={styles['background']}
        onClick={userMenuHandler}
      />
      <nav className={styles.nav}>
        <span className={styles.username}>{pseudo}</span>
        <ul className={styles.links}>
          <li className={styles.link}>
            <Link
              to={`/user/${id}`}
              onClick={userMenuHandler}
            >
              Mon Profil
            </Link>
          </li>
          <li className={styles.link}>
            <Link reloadDocument 
              to='/proposal'
              onClick={userMenuHandler}
            >
              Proposer un film
            </Link>
          </li>
          <li className={styles.link}>
            <Link onClick={()=> dispatch(setOffline())} to='/'>Se déconnecter</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

function UserMenu() {
  const { avatar } = useAppSelector<any>(userLogged);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.global.userIsOpen);
  const userMenuHandler = () => {
    dispatch(userIsOpen());
  };

  return (
    <>
      {isOpen && <Menu/>}
      <img 
        onClick={userMenuHandler} 
        className={styles.ico} 
        src={`${(avatar) ? avatar : '/images/user_default.svg'}`}
        alt=''
      />
    </>
  );
}
export default UserMenu;