import styles from './User.module.scss';

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

function UserMetrics({ stats }: UserMetrics) {
  const { uploadedMovies, commentedMovies, LikedMovies, watchList, evaluatedMovies } = stats;

  return(
    <div className={`container ${styles['user-metrics']}`}>
      <div className={`${styles['metric']} ${styles['metric--primary']}`}>
        <span className={styles['count']}>{uploadedMovies}</span>
        <span className={styles['type']}>
          Film{(uploadedMovies > 1) && 's'}
          <br/>proposé{(uploadedMovies > 1) && 's'}
        </span>
      </div>
      <div className={`${styles['metric']} ${styles['metric--secondary']}`}>
        <span className={styles['count']}>{commentedMovies}</span>
        <span className={styles['type']}>
          Film{(commentedMovies > 1) && 's'}
          <br/>commenté{(commentedMovies > 1) && 's'}
        </span>
      </div>
      <div className={`${styles['metric']} ${styles['metric--purple']}`}>
        <span className={styles['count']}>{LikedMovies}</span>
        <span className={styles['type']}>
          Film{(LikedMovies > 1) && 's'}
          <br/>aimé{(LikedMovies > 1) && 's'}
        </span>
      </div>
      <div className={`${styles['metric']} ${styles['metric--yellow']}`}>
        <span className={styles['count']}>{watchList}</span>
        <span className={styles['type']}>
          Film{(LikedMovies > 1) && 's'}
          <br/>dans ma
          <br/>watchlist
        </span>
      </div>
      <div className={`${styles['metric']} ${styles['metric--green']}`}>
        <span className={styles['count']}>{evaluatedMovies}</span>
        <span className={styles['type']}>
          Film{(LikedMovies > 1) && 's'}
          <br/>noté{(LikedMovies > 1) && 's'}
        </span>
      </div>
    </div>
  );
}

export { UserHeader, UserMetrics };