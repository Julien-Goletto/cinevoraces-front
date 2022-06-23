import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useAllMoviesQuery, useFiltersQuery } from 'redux/api';
import { initFilters, filters } from 'redux/slices/filter';
import Loader from 'components/Loader/Loader';
import AnimationLayout from 'components/AnimationRouter';
import Filters from './Filters/Filters';
import MoviesGrid from './MoviesGrid/MoviesGrid';
import styles from './Films.module.scss';

function Films() {
  const dispatch = useAppDispatch();
  const { data: filtersData }               = useFiltersQuery();
  const { data: moviesData, isLoading }     = useAllMoviesQuery('');
  const [ movies, setMovies ]               = useState<DBMovie[]>([]);
  const { genre, country, periode, query }  = useAppSelector(filters);

  // Update redux filter state with fetched filters
  useEffect(() => {
    filtersData && dispatch(initFilters((filtersData)));
  }, [filtersData, dispatch]);

  // Update movies useState with redux filter state
  useEffect(() => {
    if (moviesData && filtersData) {
      let filteredMovies: DBMovie[] = [];    
      if(genre.length > 0) {
        filteredMovies = [...moviesData].filter((movie: DBMovie) => {
          for(let genre of movie.genres) {
            if (genre.includes(genre)) return true;
          }
          return false;
        });} 
      if(country.length > 0) {
        filteredMovies = filteredMovies.filter((movie: DBMovie) => {
          let check = true;
          for(let country of movie.countries) {
            check = country.includes(country);
          }
          return check;
        });} 
      filteredMovies = filteredMovies.filter((movie: DBMovie) => {
        const date = new Date(movie.release_date);
        const year = date.getFullYear();
        if(year >= periode.stateValues[0] && year <= periode.stateValues[1]) {
          return true;
        }});
      filteredMovies = filteredMovies.filter((movie: DBMovie) => {
        return movie.french_title.toLowerCase().includes(query.toLowerCase());
      });
      setMovies(filteredMovies);
    }
  }, [moviesData, filtersData, genre, country, periode, query]);
  
  return(
    <AnimationLayout>
      <section className={styles.films}>
        <Filters/>
        {!isLoading &&
          <MoviesGrid movies={movies} />}
        {isLoading &&
          <div className={styles['loader-wrapper']}>
            <Loader />
          </div>}
      </section>
    </AnimationLayout>
  );
}

export default Films;