import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useAllMoviesQuery } from 'redux/api';
import { Button } from 'components/Buttons/Button';
import { initFilters, filterState, filterYearState, getQuery } from 'redux/slices/filter';
import { formatDataFilters } from './formatData';
import styles from './Films.module.scss';
import Filters from './Filters/Filters';
import MoviesGrid from './MoviesGrid/MoviesGrid';

function Films() {
  const { data, isLoading } = useAllMoviesQuery();
  const [ movies, setMovies ] = useState<DBMovie[]>([]);
  const filters = useAppSelector(filterState);
  const yearFilter = useAppSelector(filterYearState);
  const query = useAppSelector(getQuery);
  const dispatch = useAppDispatch();

  useEffect(() => {
    data && dispatch(initFilters(formatDataFilters(data)));
  }, [data, dispatch]);

  useEffect(() => {
    if (data && filters) {
      let filteredMovies: DBMovie[] = [...data];
    
      if (filters.season_number !== 'all') {
        filteredMovies = filteredMovies.filter(
          (movie:DBMovie)=> movie.season_number === filters.season_number
        );
      }
      if(filters.genres.length > 0) {
        filteredMovies = filteredMovies.filter((movie:DBMovie) => {
        
          for(let genre of movie.genres) {   
            if(filters.genres.includes(genre)) {
              console.log('ctrue');
              return true;
              
            };
          }
          
          return false;
        });
      } 
      if(filters.countries.length > 0) {
        filteredMovies = filteredMovies.filter((movie:DBMovie) => {
          let check = true;
          for(let country of movie.countries) {
            check = filters.countries.includes(country);
          }
          return check;
        });
      } 
      filteredMovies = filteredMovies.filter((movie:DBMovie) => {
        const date = new Date(movie.release_date);
        const year = date.getFullYear();
        if(year > yearFilter[0] && year < yearFilter[1]) {
          return true;
        }
      });
      filteredMovies = filteredMovies.filter((movie:DBMovie) => {
        return movie.french_title.toLowerCase().includes(query.toLowerCase());
      });

      setMovies(filteredMovies);
    }
  }, [data, filters, yearFilter, query]);
  
  return(
    <section className={styles.films}>
      <Filters/>
      <MoviesGrid 
        movies={movies} 
        isLoading={isLoading}
      />

      {/* <div className={styles.button}>
        <Button>
          Voir les films suivants (77)
        </Button>
      </div> */}
    </section>
  );
}

export default Films;