import { UserHeader } from './UserSections';
import styles from './User.module.scss';

const fake_data = {
  username: 'PrincessJambon59',
  avatar: '',
  createdAt: '2004-10-19 10:23:54+02'
};

function User() {

  return(
    <>
      <section className={`container ${styles['user']}`}>
        <h1 className={styles['title']}>Mon compte</h1>
        <UserHeader
          username={fake_data.username}
          avatar={fake_data.avatar}
          registerDate={fake_data.createdAt}
        />
      </section>
    </>
  );
}

export default User;