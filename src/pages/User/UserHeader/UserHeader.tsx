import styles from './UserHeader.module.scss';

function UserHeader({ avatar, username, registerDate }: UserHeader) {
  const handleTimestamp = (timestamp: string) => {
    let date = new Date(timestamp);
    let month;
    switch(Number(date.getMonth())) {
    case 1: month = 'janvier'; break; case 2: month = 'février'; break; 
    case 3: month = 'mars'; break; case 4: month = 'avril'; break; 
    case 5: month = 'mai'; break; case 6: month = 'juin'; break; 
    case 7: month = 'juillet'; break; case 8: month = 'août'; break; 
    case 9: month = 'septembre'; break; case 10: month = 'octobre'; break; 
    case 11: month = 'novembre'; break; case 12: month = 'décembre'; break; 
    } 
    return `${date.getDate()} ${month} ${date.getFullYear()}`;
  };
  const date = handleTimestamp(registerDate); 

  return(
    <div className={styles['user-header']}>
      <div className={styles['row']}>
        <img 
          className={styles['img']}
          src={`${(avatar) ? {avatar} : 'images/user_default.svg'}`}
          alt=''
        />
        <div className={styles['username']}>
          {username}
        </div>
      </div>
      <div className={styles['register-date']}>
        Membre depuis le
        <span>{date}</span>
      </div>
    </div>
  );
}

export default UserHeader;