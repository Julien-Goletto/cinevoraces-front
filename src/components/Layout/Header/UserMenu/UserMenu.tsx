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
            <a href='/'>Mon Profil</a>
          </li>
          <li className={styles.link}>
            <a href='/'>Proposer un film</a>
          </li>
          <li className={styles.link}>
            <a href='/'>Se déconnecter</a>
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