import styles from './MoviesGrid.module.scss';


function MoviesGrid({ movies, isLoading }: MovieGrid) {

  return(
    <div className={styles.grid}>
      {!isLoading &&
        movies.map((movie:any) => 
          <div 
            className={styles.poster}
            key={movie.id}
          >
            <a href={`/film/${movie.id}`}>
              <img 
                className={styles.img}
                src={movie.poster_url} alt={`Affiche du film ${movie.title}`}
              />
            </a>
          </div>
        )}
    </div>
  );
};

export default MoviesGrid;