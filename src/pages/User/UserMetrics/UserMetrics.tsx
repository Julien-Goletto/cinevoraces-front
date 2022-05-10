import styles from './UserMetrics.module.scss';

function UserMetrics({ stats }: UserMetrics) {
  const { uploadedMovies, commentedMovies, LikedMovies, watchList, evaluatedMovies } = stats;
  
  return(
    <div className={styles['user-metrics']}>
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

export default UserMetrics;