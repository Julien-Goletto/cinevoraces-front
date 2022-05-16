import { setSelectedMovie } from 'redux/slices/proposal';
import { useAppDispatch } from 'redux/hooks';
import styles from './Movie.module.scss';
import React from 'react';
import Genres from './Genres';
import Director from './Director';

function Movie(props: TMDBMovie) {
  const dispatch = useAppDispatch();
  const {title, release_date, poster_path, id} = props;
  const no_poster_path = 'https://image.tmdb.org/t/p/originalnull';
  const complete_poster_path = `https://image.tmdb.org/t/p/original${poster_path}`;
  const handle = (e: React.MouseEvent<HTMLDivElement>) => {  
    dispatch(setSelectedMovie(props));
    document.querySelector(`.${styles.selected}`)?.classList.remove(styles.selected);
    e.currentTarget?.classList.add(styles.selected);
  };
  
  return (
    <div onClick={handle} className={styles.movie}>
      <div className={styles.description}>
        <div className={styles.title}>{title} ({release_date})</div>
        <Director id={id} />
        <Genres id={id} />
      </div>
      { (complete_poster_path !== no_poster_path) &&
        <div className={styles.img}>
          <img src={complete_poster_path} alt={`Poster de ${title}`} />
        </div>
      }
      { (complete_poster_path === no_poster_path) &&
        <div className={`${styles.img} ${styles['img--no-poster-url']}`}>
          <img src='/images/missing-cover.svg' alt={`Poster de ${title}`} />
        </div>
      }
    </div>
  );
}
export default Movie;