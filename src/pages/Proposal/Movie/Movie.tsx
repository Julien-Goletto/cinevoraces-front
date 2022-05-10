import styles from './Movie.module.scss';

type MovieProps = {
  french_title: string,
  directors: string[],
  genres: string[]
  poster_url?: string,
  release: string
}


function Movie({french_title, directors, release, genres, poster_url}: MovieProps) {
  return (
    <div className={styles.movie}>
      <div className={styles.description}>
        <div className={styles.title}>{french_title} ({release})</div>
        <div className={styles.rea}>
          Realisateur : {directors.join(', ')}
        </div>
        <div className={styles.genres}>
          Genre : {genres.join(', ')}
        </div>
      </div>
      <div className={styles.img}>
        <img src={poster_url} alt={`Poster de ${french_title}`} />
      </div>
    </div>
  );
}
export default Movie;