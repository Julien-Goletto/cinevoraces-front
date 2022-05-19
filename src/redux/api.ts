import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: retry(fetchBaseQuery({
    // baseUrl: 'http://localhost:3005'
    baseUrl: 'http://localhost:3005',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as any).user.access_jwt;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), {maxRetries: 1}), tagTypes: ['Movie', 'Reviews'],
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
      transformResponse: (res:any) => res[0],
      providesTags: ['Movie']
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
    pendingProposition: build.query<any, any>({
      query: (id:number) => ({url: `/v1/propositions/hasPendingProposition/${id}`, method: 'GET', credentials: 'include'})
    }),
    availableSlots: build.query<any, void>({
      query: () => ({url: `/v1/propositions/availableSlots`, method: 'GET', credentials: 'include'})  
    }),
    bookSlot: build.mutation<any, any>({
      query: (data:any) => ({url: '/v1/propositions/book/', method: 'PUT', credentials: 'include', body: {
        publishing_date: data
      }})
    }),
    getReviews: build.query<any, any>({
      query: (arg:any) => ({url: `/v1/reviews/${arg.userId}/${arg.movieId}`, method: 'GET', credentials: 'include'})
    }),
    postInteraction: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/reviews/${arg.userId}/${arg.movieId}`, method: 'POST', credentials: 'include'})   
    }),
    putInteraction: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/reviews/${arg.userId}/${arg.movieId}`, method: 'PUT', credentials: 'include', body: arg.body}),
      invalidatesTags: ['Movie'] 
    }),
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
  useGetReviewsQuery,
  usePostInteractionMutation,
  usePutInteractionMutation,
  usePendingPropositionQuery
} = api;