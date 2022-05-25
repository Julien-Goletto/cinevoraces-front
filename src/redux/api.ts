import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: retry(fetchBaseQuery({
    // baseUrl: 'http://localhost:3005'
    baseUrl: process.env.REACT_APP_API,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as any).user.access_jwt;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), {maxRetries: 1}), tagTypes: ['Movie', 'Reviews', 'Propositions', 'Users'],
  endpoints: (build) => ({
    userRegister: build.mutation<User, any>({
      query: (user:User) => ({ url: '/v1/users/register', method:'POST', body: user })
    }),
    userLogin: build.mutation<User, any>({
      query: (user:User) => ({ url: '/v1/users/login', method:'POST', body: user, credentials: 'include' }),
      transformResponse: (res:any) => res
    }),
    userUpdate: build.mutation<void, any>({
      query: (data) => ({url: `v1/users/modify/${data.userId}`, method: 'PUT', credentials: 'include', body: data.user})
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
      providesTags: ['Reviews']
    }),
    postMovie: build.mutation<any, any>({
      query: ((proposal) => ({url: 'v1/movies/newmovie/', method: 'POST', credentials: 'include', body: proposal}))
    }), 
    metricsById: build.query<any, number>({
      query: (id:number) => ({url: `/v1/metrics/${id}`, method: 'GET', credentials: 'include'})
    }),
    userById: build.query<any, number>({
      query: (id:number) => ({url: `/v1/users/${id}`, method: 'GET', credentials: 'include'})
    }),
    pendingProposalByUser: build.query<any, number>({
      query: (id:number) => ({url: `/v1/propositions/${id}`, method: 'GET', credentials: 'include'})
    }),
    availableSlots: build.query<any, void>({
      query: () => ({url: '/v1/propositions/availableSlots', method: 'GET', credentials: 'include'})  
    }),
    pendingProposition: build.query<any, any>({
      query: (id:number) => ({url: `/v1/propositions/hasPendingProposition/${id}`, method: 'GET', credentials: 'include'})
    }),
    bookSlot: build.mutation<any, any>({
      query: (data:any) => ({url: '/v1/propositions/book/', method: 'PUT', credentials: 'include', body: {
        publishing_date: data
      }})
    }),
    getReviews: build.query<any, any>({
      query: (arg:any) => ({url: `/v1/reviews/${arg.userId}/${arg.movieId}`, method: 'GET', credentials: 'include'}),
      providesTags: ['Reviews']
    }),
    postInteraction: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/reviews/${arg.userId}/${arg.movieId}`, method: 'POST', credentials: 'include'})   
    }),
    putInteraction: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/reviews/${arg.userId}/${arg.movieId}`, method: 'PUT', credentials: 'include', body: arg.body}),
      invalidatesTags: ['Movie', 'Reviews'] 
    }),
    adminGetPropositions: build.query<any, void>({
      query: () => ({url : '/v1/propositions/pendingPropositions', method: 'GET'}),
      providesTags: ['Propositions']
    }),
    adminPublishMovie: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/movies/publishing/${arg.movieId}`, method: 'PUT', body: arg.body}),
      invalidatesTags: ['Propositions'] 
    }),
    adminGetUsers: build.query<any, void>({
      query: () => ({url : '/v1/users', method: 'GET'}),
      providesTags: ['Users']
    }),
    adminPutUser: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/users/modify/${arg.userId}`, method: 'PUT', body: arg.body}),
      invalidatesTags: ['Users'] 
    }),
  })
});

export const { 
  useAdminGetPropositionsQuery,
  useAdminPublishMovieMutation,
  useAdminGetUsersQuery,
  useAdminPutUserMutation,
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