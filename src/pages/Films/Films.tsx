import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useGetAllMoviesQuery, useGetAllFiltersQuery } from 'redux/api';
import { initFilters, filters } from 'redux/slices/filter';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import Filters from 'components/Filters/Filters';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import styles from './Films.module.scss';

function Films() {
  const dispatch = useAppDispatch();
  const [queryString, setQueryString] = useState('');
  const {data: filtersData}           = useGetAllFiltersQuery();
  const {data: moviesData, isLoading} = useGetAllMoviesQuery(queryString);
  const [movies, setMovies]           = useState<DBMovie[]>([]);
  const {mainFilters, genre, country, periode, query} = useAppSelector(filters);

  // Resolve tags filtering
  const filterTags = (tagsArray: string[], movieArray: DBMovie[], tagsField: string) => {
    if (tagsArray.length > 0) { // Prevent undefined return
      return movieArray.filter((movie) => {
        // resolve tag
        if (tagsField === 'genres') {
          for (const x of movie.genres) {
            if (tagsArray.includes(x)) return true;
          }}
        if (tagsField === 'countries') {
          for (const x of movie.countries) {
            if (tagsArray.includes(x)) return true;
          }}        
        return false;
      });
    }
    return movieArray; // Return all movies if tagsArray empty
  };

  // Update redux filter state with fetched filters
  useEffect(() => {
    filtersData && dispatch(initFilters((filtersData)));
  }, [filtersData, dispatch]);

  // Update queryString useState with redux filter state
  useEffect(() => {
    if (filtersData && mainFilters.length > 1) {
      let query = '';
      mainFilters.forEach(({value, isChecked}) => {
        if (isChecked) query = value!;
      });
      (query !== queryString) && setQueryString(query);
    }
  }, [filtersData, mainFilters, dispatch]);

  // Update movies useState with redux filter state
  useEffect(() => {
    if (moviesData && filtersData) {
      // Create checked tag names array
      const checkedGenres: string[] = [];
      const checkedCountries: string[] = [];
      const checkedSeason: string[] = [];
      genre.forEach(({name, isChecked}) => {
        isChecked && checkedGenres.push(name);
      });
      country.forEach(({name, isChecked}) => {
        isChecked && checkedCountries.push(name);
      });
      mainFilters.forEach(({value, isChecked}) => {
        isChecked && checkedSeason.push(value!);
      });
      // filter moviesData
      let filteredMovies = filterTags(checkedSeason, moviesData, 'season');
      filteredMovies = filterTags(checkedGenres, moviesData, 'genres');
      filteredMovies = filterTags(checkedCountries, filteredMovies, 'countries');
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
  }, [moviesData, filtersData, mainFilters, genre, country, periode, query]);
  
  return(
    <AnimationLayout>
      <section className={styles.films}>
        <Filters/>
        {!isLoading &&
          <motion.div className={styles.grid} 
            animate={{opacity: [0,1]}} transition= {{delay: 0.2}}
          >
            {movies.map((movie) => <Movie movie={movie}/>)}
          </motion.div>}
        {isLoading &&
          <div className={styles['loader-wrapper']}>
            <Loader />
          </div>}
      </section>
    </AnimationLayout>
  );
}

function Movie({movie}: {movie: DBMovie}) {
  const [opacity, setOpacity] = useState(0);
  const handleOnLoad = () => {
    setOpacity(1);
  };

  return(
    <div 
      className={styles.poster}
      key={movie.id}
      style={{opacity: opacity}}
    >
      <Link to={`/film/${movie.id}`}>
        <img className={`${styles.img}`} src={movie.poster_url} onLoad={handleOnLoad} alt={`affiche du film ${movie.french_title}`}/>
      </Link>
    </div>
  );
}

export default Films;