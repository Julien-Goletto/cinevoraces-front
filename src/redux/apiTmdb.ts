import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const maxResult = 15;

export const apiTmdb = createApi({
  reducerPath: 'apiTmdb',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TMDB
  }),
  endpoints: (build) => ({
    tmdb: build.query<any, string>({
      query: (query) =>  ({
        url: `/search/movie?api_key=${API_KEY}&language=fr-FR&include_adult=false&query=${query}`, 
        method: 'GET'
      }),
      transformResponse: ({results}) => {
        if (results > maxResult) {
          return results.slice(0, maxResult);
        } else {
          return results;
        }
      }}),
    tmdbDetails: build.query<any, string>({
      query: (movieId) =>  ({
        url: `/movie/${movieId}?api_key=${API_KEY}&language=fr-FR&include_adult=false`, 
        method: 'GET'
      }),
      transformResponse: ({genres}) => genres
    }),
    tmdbCrew: build.query<any, string>({
      query: (movieId) =>  ({
        url: `/movie/${movieId}/credits?api_key=${API_KEY}&language=fr-FR&include_adult=false`, 
        method: 'GET'
      }),
      transformResponse: ({crew}) => crew
    }),
  })
});

export const { 
  useTmdbQuery,
  useTmdbDetailsQuery,
  useTmdbCrewQuery
} = apiTmdb;