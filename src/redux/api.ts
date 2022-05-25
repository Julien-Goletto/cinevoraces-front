import { createApi, fetchBaseQuery, retry, FetchBaseQueryError, FetchArgs, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { setOffline, setUser } from './slices/user';

const baseQuery = retry(fetchBaseQuery({
  // baseUrl: 'http://localhost:3005'
  baseUrl: process.env.REACT_APP_API,
  prepareHeaders: (headers, {getState, endpoint}) => {
    const accessToken = (getState() as any).user.access_jwt;
    const refreshToken = Cookies.get('refreshToken');
    
    if(headers.get('authorization')) {
      return headers;
    }
    
    if(endpoint === 'refreshToken') {
      headers.set('authorization', `Bearer ${refreshToken}`);
    }

    if (accessToken && endpoint !== 'refreshToken') {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
}), {maxRetries: 1});

const baseQueryWithReauth = async (args:any, api:any, extraOptions:any) => {
    
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && 'originalStatus' in result.error && result.error.originalStatus === 401) {
    // try to get a new token
    const refreshToken = Cookies.get('refreshToken');
    const refreshResult = await baseQuery({url: 'v1/refreshTokens', headers: {
      'authorization': `Bearer ${refreshToken}`
    }}, api, extraOptions);

    if (refreshResult.data) {
      // store the new token
      api.dispatch(setUser(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setOffline());
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth, tagTypes: ['Movie', 'Reviews', 'Propositions', 'Users'],
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
    oneMovie: build.query<DBMovie, number>({
      query: (id) => ({url: `/v1/movies/${id}`, method: 'GET'}),
      transformResponse: (res:any) => res[0],
      providesTags: ['Movie']
    }),
    lastMovie: build.query<DBMovie[], void>({
      query: () => ({url: 'v1/movies/lastmovie', method: 'GET'})
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
    movieReviews: build.query<Comment[], number>({
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
    getUserReview: build.query<Reviews, object>({
      query: (arg:{userId: number, movieId:number}) => ({url: `/v1/reviews/${arg.userId}/${arg.movieId}`, method: 'GET'}),
      providesTags: ['Reviews']
    }),
    postInteraction: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/reviews/${arg.userId}/${arg.movieId}`, method: 'POST'})   
    }),
    putInteraction: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/reviews/${arg.userId}/${arg.movieId}`, method: 'PUT', body: arg.body}),
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
  useLastMovieQuery,
  usePostMovieMutation,
  useAllMetricsQuery,
  useRefreshTokenMutation,
  useMovieReviewsQuery,
  useMetricsByIdQuery,
  useUserByIdQuery,
  usePendingProposalByUserQuery,
  useAvailableSlotsQuery,
  useBookSlotMutation,
  useGetUserReviewQuery,
  usePostInteractionMutation,
  usePutInteractionMutation,
  usePendingPropositionQuery
} = api;