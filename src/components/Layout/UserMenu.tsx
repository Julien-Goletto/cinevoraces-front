import { setOffline, userLogged } from 'redux/slices/user';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { globalState, toggleUserMenu } from 'redux/slices/global';
import styles from './UserMenu.module.scss';

/**
 * @returns User menu
 */
function Menu() {
  const { pseudo, id, role } = useAppSelector(userLogged);
  const dispatch = useAppDispatch();

  const userMenuHandler = () => {
    dispatch(toggleUserMenu());
  };
  const logoutHandler = () => {
    dispatch(setOffline());
  };

  return (
    <>
      <div className={styles['background']} onClick={userMenuHandler}/>
      <nav className={styles.nav}>
        <span className={styles.username}>{pseudo}</span>
        <ul className={styles.links}>
          <li className={styles.link}>
            <Link to={`/user/${id}`} onClick={userMenuHandler}>
              Mon Profil
            </Link>
          </li>
          <li className={styles.link}>
            <Link reloadDocument to='/proposal' onClick={userMenuHandler}>
              Proposer un film
            </Link>
          </li>
          {(role === 'admin') &&
            <li className={styles.link}>
              <Link reloadDocument to='/admin' onClick={userMenuHandler}>
                Dashboard Admin
              </Link>
            </li>}
          <li className={styles.link}>
            <Link onClick={logoutHandler} to='/'>
              Se déconnecter
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

function UserMenu() {
  const { avatar } = useAppSelector<any>(userLogged);
  const dispatch = useAppDispatch();
  const {userIsOpen} = useAppSelector(globalState);
  const userMenuHandler = () => {
    dispatch(toggleUserMenu());
  };

  return (
    <>
      {userIsOpen && <Menu/>}
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