import styles from './UserMetrics.module.scss';

function UserMetrics({ stats }: UserMetrics) {
  const { proposed_movies_count, comments_count, likes_count, watchlist_count, ratings_count } = stats;
  
  return(
    <div className={styles['user-metrics']}>
      <div className={`${styles['metric']} ${styles['metric--primary']}`}>
        <span className={styles['count']}>{proposed_movies_count}</span>
        <span className={styles['type']}>
          Film{(proposed_movies_count > 1) && 's'}
          <br/>proposé{(proposed_movies_count > 1) && 's'}
        </span>
      </div>
      <div className={`${styles['metric']} ${styles['metric--secondary']}`}>
        <span className={styles['count']}>{comments_count}</span>
        <span className={styles['type']}>
          Film{(comments_count > 1) && 's'}
          <br/>commenté{(comments_count > 1) && 's'}
        </span>
      </div>
      <div className={`${styles['metric']} ${styles['metric--purple']}`}>
        <span className={styles['count']}>{likes_count}</span>
        <span className={styles['type']}>
          Film{(likes_count > 1) && 's'}
          <br/>aimé{(likes_count > 1) && 's'}
        </span>
      </div>
      <div className={`${styles['metric']} ${styles['metric--yellow']}`}>
        <span className={styles['count']}>{watchlist_count}</span>
        <span className={styles['type']}>
          Film{(likes_count > 1) && 's'}
          <br/>dans ma
          <br/>watchlist
        </span>
      </div>
      <div className={`${styles['metric']} ${styles['metric--green']}`}>
        <span className={styles['count']}>{ratings_count}</span>
        <span className={styles['type']}>
          Film{(likes_count > 1) && 's'}
          <br/>noté{(likes_count > 1) && 's'}
        </span>
      </div>
    </div>
  );
}

export default UserMetrics;