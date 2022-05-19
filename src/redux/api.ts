import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:3005'
    baseUrl: 'http://localhost:3005',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as any).user.access_jwt;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
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
    refreshToken: build.mutation<any, void>({
      query: () => {
        return ({url: '/v1/refreshTokens', method: 'GET', credentials: 'include'});
      },
    }),
    movieReviews: build.query<any, number>({
      query: (id) => ({url: `/v1/reviews/${id}/comments`, method: 'GET', credentials: 'include'}),
    }),
    postMovie: build.mutation<any, any>({
      query: ((proposal) => ({url: 'v1/movies/newmovie/', method: 'POST', credentials: 'include', body: proposal}))
    }), 
    metricsById: build.query<any, number>({
      query: (id:number) => ({url: `/v1/metrics/${id}`, method: 'GET', credentials: 'include'})
    }),
    availableSlots: build.query<any, number>({
      query: (id:number) => ({url: `/v1/propositions/availableSlots/${id}`, method: 'GET', credentials: 'include'})  
    }),
    bookSlot: build.mutation<any, any>({
      query: (data:any) => ({url: 'v1/propositions/book/', method: 'PUT', credentials: 'include', body: {
        publishing_date: data
      }})
    }) ,
  })
});

export const { 
  useUserRegisterMutation,
  useUserLoginMutation,
  useAllMoviesQuery,
  useOneMovieQuery,
  usePostMovieMutation,
  useAllMetricsQuery,
  useRefreshTokenMutation,
  useMovieReviewsQuery,
  useMetricsByIdQuery,
  useAvailableSlotsQuery,
  useBookSlotMutation,
} = api;