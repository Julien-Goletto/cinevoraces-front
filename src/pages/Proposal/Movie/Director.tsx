import styles from './Movie.module.scss';
import { useTmdbCrewQuery } from 'redux/apiTmdb';

function Director ({id}: {id: number}) {
  const { data } = useTmdbCrewQuery(String(id));
  const directors: string[] = [];
  if (data) {
    data.forEach(({job, name}: {[key: string]: string}) => {
      (job === 'Producer') && directors.push(name);
    });}

  return(
    <div className={styles.rea}>
      { data &&
      <>
        Réalisateur{(directors.length > 1) && 's'} :
        { (directors.length === 0) && <span> N/C</span> }
        { directors.map((member, index) => {
          return <span key={index}> {member}{(index + 1 < directors.length) && ', '}</span>;
        })}
      </>
      }
    </div>
  );
}

export default Director;