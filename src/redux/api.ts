import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type User = {
  pseudo: string,
  mail: string,
  password: string
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:3005'
    baseUrl: process.env.REACT_APP_API
  }),
  endpoints: (build) => ({
    userRegister: build.mutation<User, any>({
      query: (user:User) => ({ url: '/v1/users/register', method:'POST', body: user })
    }),
    userLogin: build.mutation<User, any>({
      query: (user:User) => ({ url: '/v1/users/login', method:'POST', body: user, credentials: 'include' }),
      transformResponse: (res:any) => res
    }),
    allMovies: build.query<any, void>({
      query: () =>  ({url: '/v1/movies', method: 'GET'})
    }),
    oneMovie: build.query<void, number>({
      query: (id) => ({url: `/v1/movies/${id}`, method: 'GET'}),
      transformResponse: (res:any) => res[0]
    }),
    allMetrics: build.query<any, void>({
      query: () => ({url: '/v1/metrics', method: 'GET'}),
      transformResponse: (res:any) => res[0]
    }),
  })
});

export const { 
  useUserRegisterMutation,
  useUserLoginMutation,
  useAllMoviesQuery,
  useOneMovieQuery,
  useAllMetricsQuery,
} = api;