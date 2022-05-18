import styles from './Movie.module.scss';

function Genres ({genres}: {genres: string[]}) {
  return(
    <div className={styles.genres}>
      { genres &&
      <>
        Genre{genres.length > 0 ? 's' : ''} : {genres.join(', ')}
      </>
      }
    </div>
  );
}

export default Genres;