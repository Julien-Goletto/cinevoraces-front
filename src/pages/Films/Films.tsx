import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useGetAllMoviesQuery, useGetAllFiltersQuery } from 'redux/api';
import { initFilters, filters } from 'redux/slices/filter';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from 'components/Loader/Loader';
import Filters from 'components/Filters/Filters';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import styles from './Films.module.scss';
import Footer from 'components/Layout/Footer';

function Films() {
  const dispatch = useAppDispatch();
  const [queryString, setQueryString] = useState('');
  const {data: filtersData}           = useGetAllFiltersQuery();
  const {data: moviesData, isLoading} = useGetAllMoviesQuery(queryString);
  const [movies, setMovies]           = useState<DBMovie[]>([]);
  const {mainFilters, genre, country, periode, runtime, query} = useAppSelector(filters);

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
  }, [filtersData]);

  // Update queryString useState with redux filter state
  useEffect(() => {
    if (filtersData && mainFilters.length > 1) {
      let query = '';
      mainFilters.forEach(({value, isChecked}) => {
        if (isChecked) query = value!;
      });
      (query !== queryString) && setQueryString(query);
    }}, [filtersData, mainFilters]);

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
      filteredMovies = filteredMovies.filter(movie => {
        const date = new Date(movie.release_date);
        const year = date.getFullYear();
        if (year >= periode.stateValues[0] && year <= periode.stateValues[1]) {
          return true;
        }});
      filteredMovies = filteredMovies.filter (movie => {
        if (movie.runtime <= runtime.value) return true;
      });
      filteredMovies = filteredMovies.filter(movie => {
        return movie.french_title.toLowerCase().includes(query.toLowerCase());
      });
      setMovies(filteredMovies);
    }}, [moviesData, filtersData, mainFilters, genre, country, periode, runtime, query]);
  
  return(
    <AnimationLayout>
      <main className={styles.films}>
        <Filters/>
        {!isLoading &&
          <div className={styles.grid}>
            {movies.map((movie) => <Movie movie={movie} key={movie.id}/>)}
          </div>}
        {isLoading &&
          <div className={styles['loader-wrapper']}>
            <Loader />
          </div>}
      </main>
      {!isLoading && <Footer/>}
    </AnimationLayout>
  );
}

function Movie({movie}: {movie: DBMovie}) {
  const [isLoading, setIsLoading] = useState(true);
  const onLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    e.currentTarget.style.opacity = '1';
  };
  const transition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.2
  }; 
  const variants = {
    hidden: {opacity: 0, transition},
    show:   {opacity: 1, transition},
  };
  return(
    <>
      <div className={styles.poster}>
        <Link to={`/film/${movie.id}`}>
          {isLoading && 
            <motion.div 
              variants={variants}
              initial='hidden'
              animate='show'
              className={styles['loader-poster']}>
              <Loader/>
            </motion.div>}
          <img onLoad={onLoad} src={movie.poster_url} alt={`affiche du film ${movie.french_title}`}/>
        </Link>
      </div>
    </>
  );
}

export default Films;