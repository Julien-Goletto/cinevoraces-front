import { setSelectedMovie } from 'redux/slices/proposal';
import { useAppDispatch } from 'redux/hooks';
import styles from './Movie.module.scss';
import React from 'react';

type MovieProps = {
  french_title: string,
  directors: string[],
  genres: string[]
  poster_url?: string,
  release: string,
}


function Movie(props: MovieProps) {

  const dispatch = useAppDispatch();
  const {french_title, directors, release, genres, poster_url} = props;
  const handle = (e: React.MouseEvent<HTMLDivElement>) => {  
    dispatch(setSelectedMovie(props));
    document.querySelector(`.${styles.selected}`)?.classList.remove(styles.selected);
    e.currentTarget?.classList.add(styles.selected);
  };
  
  return (
    <div onClick={handle} className={styles.movie}>
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