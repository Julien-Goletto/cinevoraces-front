import styles from './UserHeader.module.scss';

type UserHeaderProps = {
  username: string,
  avatar?: string | null,
  registerDate: string
}

function UserHeader({ avatar, username, registerDate }: UserHeaderProps) {
  let date = new Date(registerDate);
  let customDate = date.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});

  return(
    <div className={styles['user-header']}>
      <div className={styles['row']}>
        <img 
          className={styles['img']}
          src={`${(avatar) ? avatar : '/images/user_default.svg'}`}
          alt=''
        />
        <div className={styles['username']}>
          {username}
        </div>
      </div>
      <div className={styles['register-date']}>
        Membre depuis le
        <span>{customDate}</span>
      </div>
    </div>
  );
}

export default UserHeader;