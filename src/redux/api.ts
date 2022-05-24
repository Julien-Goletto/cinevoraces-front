import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: retry(fetchBaseQuery({
    // baseUrl: 'http://localhost:3005'
    baseUrl: process.env.REACT_APP_API,
    prepareHeaders: (headers, {getState, endpoint}) => {
      const accessToken = (getState() as any).user.access_jwt;
      const refreshToken = Cookies.get('refreshToken');
      
      if(endpoint === 'refreshToken') {
        console.log(refreshToken);
        headers.set('authorization', `Bearer ${refreshToken}`);
      }

      if (accessToken && endpoint !== 'refreshToken') {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }), {maxRetries: 1}), tagTypes: ['Movie', 'Reviews'],
  endpoints: (build) => ({
    userRegister: build.mutation<User, any>({
      query: (user:User) => ({ url: '/v1/users/register', method:'POST', body: user })
    }),
    userLogin: build.mutation<User, any>({
      query: (user:User) => ({ url: '/v1/users/login', method:'POST', body: user}),
      transformResponse: (res:any) => res
    }),
    userUpdate: build.mutation<void, any>({
      query: (data) => ({url: `v1/users/modify/${data.userId}`, method: 'PUT', body: data.user})
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
        return ({url: '/v1/refreshTokens', method: 'GET'});
      },
    }),
    //const token = (getState() as any).user.access_jwt;
    movieReviews: build.query<any, number>({
      query: (id) => ({url: `/v1/reviews/${id}/comments`, method: 'GET'}),
      providesTags: ['Reviews']
    }),
    postMovie: build.mutation<any, any>({
      query: ((proposal) => ({url: 'v1/movies/newmovie/', method: 'POST', body: proposal}))
    }), 
    metricsById: build.query<any, number>({
      query: (id:number) => ({url: `/v1/metrics/${id}`, method: 'GET'})
    }),
    userById: build.query<any, number>({
      query: (id:number) => ({url: `/v1/users/${id}`, method: 'GET'})
    }),
    pendingProposalByUser: build.query<any, number>({
      query: (id:number) => ({url: `/v1/propositions/${id}`, method: 'GET'})
    }),
    availableSlots: build.query<any, void>({
      query: () => ({url: '/v1/propositions/availableSlots', method: 'GET'})  
    }),
    pendingProposition: build.query<any, any>({
      query: (id:number) => ({url: `/v1/propositions/hasPendingProposition/${id}`, method: 'GET'})
    }),
    bookSlot: build.mutation<any, any>({
      query: (data:any) => ({url: '/v1/propositions/book/', method: 'PUT', body: {
        publishing_date: data
      }})
    }),
    getReviews: build.query<any, any>({
      query: (arg:any) => ({url: `/v1/reviews/${arg.userId}/${arg.movieId}`, method: 'GET'}),
      providesTags: ['Reviews']
    }),
    postInteraction: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/reviews/${arg.userId}/${arg.movieId}`, method: 'POST'})   
    }),
    putInteraction: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/reviews/${arg.userId}/${arg.movieId}`, method: 'PUT', body: arg.body}),
      invalidatesTags: ['Movie', 'Reviews'] 
    }),
  })
});

export const { 
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserUpdateMutation,
  useAllMoviesQuery,
  useOneMovieQuery,
  usePostMovieMutation,
  useAllMetricsQuery,
  useRefreshTokenMutation,
  useMovieReviewsQuery,
  useMetricsByIdQuery,
  useUserByIdQuery,
  usePendingProposalByUserQuery,
  useAvailableSlotsQuery,
  useBookSlotMutation,
  useGetReviewsQuery,
  usePostInteractionMutation,
  usePutInteractionMutation,
  usePendingPropositionQuery
} = api;