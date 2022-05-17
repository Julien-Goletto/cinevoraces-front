import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useAllMoviesQuery } from 'redux/api';
import { Button } from 'components/Buttons/Button';
import { initFilters, filterState } from 'redux/slices/filter';
import { formatDataFilters } from './formatData';
import styles from './Films.module.scss';
import Filters from './Filters/Filters';
import MoviesGrid from './MoviesGrid/MoviesGrid';

function Films() {
  const { data, isLoading } = useAllMoviesQuery();
  const [ movies, setMovies ] = useState<DBMovie[]>([]);
  const filters = useAppSelector(filterState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    data && dispatch(initFilters(formatDataFilters(data)));
  }, [data, dispatch]);

  useEffect(() => {
    if (data && filters) {
      let filteredMovies: DBMovie[] = [...data];
      if (filters.season_number !== 'all') {
        filteredMovies.forEach((movie: DBMovie, i: number) => {
          (movie.season_number !== filters.season_number) && filteredMovies.splice(i, 1);
        });
      }
      filteredMovies.forEach((movie: DBMovie, i: number) => {
        const intersection = filters.genres.filter( (genre) => movie.genres.includes(genre));
        (intersection.length < 0) && filteredMovies.splice(i, 1);
      });
      filteredMovies.forEach((movie: DBMovie, i: number) => {
        const intersection = filters.countries.filter( (country) => movie.countries.includes(country));
        (intersection.length > 0) && filteredMovies.splice(i, 1);
      });
      setMovies(filteredMovies);
      console.log(filteredMovies);
    }
  }, [data, filters]);
  
  return(
    <section className={styles.films}>
      <Filters/>
      <MoviesGrid 
        movies={movies} 
        isLoading={isLoading}
      />
      <div className={styles.button}>
        <Button>
          Voir les films suivants (77)
        </Button>
      </div>
    </section>
  );
}

export default Films;