/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

/**
 * Hook to call the TMDB API  to get a list of {number} top films whith searchQuery
 * @param search String: Query from user 
 * @param number Number: Number of list you want to return 
 * @returns 
 */
function useTmdb(search:string, number:number) {
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const API_PREFIX = 'https://api.themoviedb.org/3';

  async function fetchResult(search:string, number:number) {
    if(search === '') return false;
    try {
      const res = await fetch(`${API_PREFIX}/search/movie?api_key=${API_KEY}&language=fr-FR&include_adult=false&query=${search}`);
      const { results } = await res.json();
      if(results.length > number) return results.slice(0, number);
      else return results;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async function getMovieDetails(movie:any) {
    const resDetails = await fetch(`${API_PREFIX}/movie/${movie.id}?api_key=${API_KEY}&language=fr-FR&include_adult=false`);
    const resCast = await fetch(`${API_PREFIX}/movie/${movie.id}/credits?api_key=${API_KEY}&language=fr-FR&include_adult=false`);
    const movieDetails = await resDetails.json();
    const castAndDirectors = await resCast.json();
    const crew = castAndDirectors.crew;
    const cast = castAndDirectors.cast;
    const movieGenres = movieDetails.genres;
    const productCoutries = movieDetails.production_countries;
    const spokenLanguages = movieDetails.spoken_languages;

    const directors = [];
    let director:Director;
    for(director of crew) {
      if(director.job === 'Director') {
        directors.push(director.name);
      }
    }
    const casting = [];
    let actor: {name:string};
    for (actor of cast.slice(0,5)){
      casting.push(actor.name);
    }
    const genres = [];
    let genre: {name:string};
    for (genre of movieGenres){
      genres.push(genre.name);
    }
    const countries = [];
    let countrie: {name: string};
    for (countrie of productCoutries) {
      countries.push(countrie.name);
    }
    const languages = [];
    let language: {name: string};
    for (language of spokenLanguages){
      languages.push(language.name);
    }
    
    const movieWithDetails = 
    {
      title: movie.title,
      original_title: movie.original_title,
      poster_url: 'https://image.tmdb.org/t/p/original' + movie.poster_path,
      release: movie.release_date,
      runtime: movieDetails.runtime,
      directors,
      casting,
      genres,
      languages,
      countries
    };
    return movieWithDetails;
  }

  async function fetchResultsWithDetails (search: string, number:number):Promise<TMDBMovie[] | undefined> {
    const movies = await fetchResult(search, number);
    if(!movies) return;
    const detailledMoviesPromises = [];
    for (const movie of movies){
      const detailledMovie = await getMovieDetails(movie);
      detailledMoviesPromises.push(detailledMovie);
    };
    const detailledMovie = await Promise.all(detailledMoviesPromises);
    return detailledMovie;
  }

  const [movies, setMovies] = useState<TMDBMovie[] | undefined>();
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    async function setResult(search:string, number:number) {
      const result = await fetchResultsWithDetails(search, number);
      setMovies(result);
    }
    try {
      setResult(search, number);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  return {loading, movies};
}


export default useTmdb;