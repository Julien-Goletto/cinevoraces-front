import { setSelectedMovie } from 'redux/slices/proposal';
import { useAppDispatch } from 'redux/hooks';
import styles from './Movie.module.scss';
import React from 'react';
import Genres from './Genres';
import Director from './Director';

function Movie({movie} : {movie: ProposalMovie} ) {
  const dispatch = useAppDispatch();
  const { french_title, poster_url, release_date, directors, movie_genres } = movie;
  const no_poster_path = 'https://image.tmdb.org/t/p/originalnull';
  const complete_poster_path = `https://image.tmdb.org/t/p/original${poster_url}`;
  const transformDate = new Date(release_date);
  
  
  const handle = (e: React.MouseEvent<HTMLDivElement>) => { 
    dispatch(setSelectedMovie(movie));
    document.querySelector(`.${styles.selected}`)?.classList.remove(styles.selected);
    e.currentTarget?.classList.add(styles.selected);
  };
  
  return (
    <div onClick={handle} className={styles.movie}>
      <div className={styles.description}>
        <div className={styles.title}>{french_title} ({transformDate.getFullYear() || '~'})</div>
        <Director directors={directors} />
        <Genres genres={movie_genres} />
      </div>
      { (poster_url !== no_poster_path) &&
        <div className={styles.img}>
          <img src={complete_poster_path} alt={`Poster de ${french_title}`} />
        </div>
      }
      { (poster_url === no_poster_path) &&
        <div className={`${styles.img} ${styles['img--no-poster-url']}`}>
          <img src='/images/missing-cover.svg' alt={'Poster par default'} />
        </div>
      }
    </div>
  );
}
export default Movie;