import styles from './Movie.module.scss';
import { useTmdbDetailsQuery } from 'redux/apiTmdb';

function Genres ({id}: {id: number}) {
  const { data } = useTmdbDetailsQuery(String(id));
  return(
    <div className={styles.genres}>
      { data &&
      <>
        Genre{(data.length > 1) && 's'} :
        { data.map(({name, id}: {name: string, id: number}, index: number) => {
          return <span key={id}> {name}{(index + 1 < data.length) && ', '}</span>;
        })}
      </>
      }
    </div>
  );
}

export default Genres;