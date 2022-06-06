import { useState } from 'react';
import { Link     } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import styles from './MoviesGrid.module.scss';
import { motion } from 'framer-motion';

function MoviesGrid({ movies, isLoading }: MovieGrid) {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const onLoadHandler = () => {
    setTimeout(() => {setIsImgLoading(false);}, 3000);
  };

  return(
    !isLoading ?
      <motion.div
        className={styles.grid}
        animate={{ 
          opacity: [0,1]
        }}
        transition= {{delay: 0.2}}
      >
        {
          movies.map((movie:any) => 
            <motion.div 
              className={styles.poster}
              key={movie.id}
            >
              <Link to={`/film/${movie.id}`}>
                <img 
                  className={`${styles.img}`}
                  src={movie.poster_url} alt={`Affiche du film ${movie.title}`}
                  onLoad={onLoadHandler}
                />
              </Link>
            </motion.div>
          )}
      </motion.div>
      : 
      <div className={styles['loader-wrapper']}>
        <Loader />
      </div>
  );
};

export default MoviesGrid;