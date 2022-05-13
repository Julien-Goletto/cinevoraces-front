import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { userIsOpen } from 'redux/slices/global';
import styles from './UserMenu.module.scss';


function Menu() {
  return (
    <>
      <nav className={styles.nav}>
        <span className={styles.username}>PrincessJambon69</span>
        <ul className={styles.links}>
          <li className={styles.link}>
            <Link to='/'>Mon Profil</Link>
          </li>
          <li className={styles.link}>
            <Link to='/'>Proposer un film</Link>
          </li>
          <li className={styles.link}>
            <Link to='/'>Se déconnecter</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

function UserMenu() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.global.userIsOpen);
  const userMenuHandler = () => {
    dispatch(userIsOpen());
  };

  return (
    <>

      {isOpen && <Menu/>}
      <img onClick={userMenuHandler} className={styles.ico} src='images/user_default.svg' alt='' />
    </>
  );
}
export default UserMenu;