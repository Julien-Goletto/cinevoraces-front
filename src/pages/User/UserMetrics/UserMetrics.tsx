import { useMetricsByIdQuery } from 'redux/api';
import styles from './UserMetrics.module.scss';

function UserMetrics({ id }: { id: string }) {
  const { data, isLoading } = useMetricsByIdQuery(Number(id));
  return(
    <>
      { !isLoading &&
        <div className={styles['user-metrics']}>
          <div className={`${styles['metric']} ${styles['metric--primary']}`}>
            <span className={styles['count']}>{data[0].propositions_count}</span>
            <span className={styles['type']}>
              Film{(data[0].propositions_count > 1) && 's'}
              <br/>proposé{(data[0].propositions_count > 1) && 's'}
            </span>
          </div>
          <div className={`${styles['metric']} ${styles['metric--secondary']}`}>
            <span className={styles['count']}>{data[0].comments_count}</span>
            <span className={styles['type']}>
              Film{(data[0].comments_count > 1) && 's'}
              <br/>commenté{(data[0].comments_count > 1) && 's'}
            </span>
          </div>
          <div className={`${styles['metric']} ${styles['metric--purple']}`}>
            <span className={styles['count']}>{data[0].likes_count}</span>
            <span className={styles['type']}>
              Film{(data[0].likes_count > 1) && 's'}
              <br/>aimé{(data[0].likes_count > 1) && 's'}
            </span>
          </div>
          <div className={`${styles['metric']} ${styles['metric--yellow']}`}>
            <span className={styles['count']}>{data[0].watchlist_count}</span>
            <span className={styles['type']}>
              Film{(data[0].likes_count > 1) && 's'}
              <br/>dans ma
              <br/>watchlist
            </span>
          </div>
          <div className={`${styles['metric']} ${styles['metric--green']}`}>
            <span className={styles['count']}>{data[0].ratings_count}</span>
            <span className={styles['type']}>
              Film{(data[0].likes_count > 1) && 's'}
              <br/>noté{(data[0].likes_count > 1) && 's'}
            </span>
          </div>
        </div>
      }
    </>
  );
}

export default UserMetrics;