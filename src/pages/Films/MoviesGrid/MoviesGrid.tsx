import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './MoviesGrid.module.scss';

function MoviesGrid({movies}: {movies: DBMovie[]}) {

  return(
    <motion.div className={styles.grid} 
      animate={{opacity: [0,1]}}
      transition= {{delay: 0.2}}
    >
      {movies.map((movie:any) => 
        <motion.div className={styles.poster} key={movie.id}>
          <Link to={`/film/${movie.id}`}>
            <img className={`${styles.img}`} src={movie.poster_url} alt=''/>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MoviesGrid;