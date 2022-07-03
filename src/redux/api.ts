import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { setOffline, setUser } from './slices/user';
import Cookies from 'js-cookie';

const baseQuery = retry(fetchBaseQuery({
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
}), {maxRetries: 0});

const baseQueryWithReauth = async (args:any, api:any, extraOptions:any) => {
    
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && 'status' in result.error && result.error.status === 401) {
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
  baseQuery: baseQueryWithReauth, tagTypes: ['Movie', 'Reviews', 'Propositions', 'Users', 'UserParams'],
  endpoints: (build) => ({
    userRegister: build.mutation<string, {[key: string]: string | null}>({
      query: (user) => ({ url: '/v1/users/register', method:'POST', body: user })
    }),
    userLogin: build.mutation<user, {[key: string]: string}>({
      query: (user) => ({ url: '/v1/users/login', method:'POST', body: user}),
      transformResponse: (res: user) => res
    }),
    userUpdate: build.mutation<string, {userId: number, user: {[key: string]: string}}>({
      query: ({user, userId}) => ({url: `v1/users/modify/${userId}`, method: 'PUT', body: user}),
      invalidatesTags: ['UserParams'] 
    }),
    // FIXME: updatePicture method/component must be rewrited 
    userUpdatePicture: build.mutation<void, any>({
      query: (data) => ({url: `v1/users/addProfilePic/${data.userId}`, method: 'PUT', body: data.form}),
      invalidatesTags: ['UserParams'] 
    }),
    filters: build.query<DBFilters[], void>({
      query: () => ({url: '/v1/metrics/filters', method: 'GET'})
    }),
    allMovies: build.query<DBMovie[], string>({
      query: (query) =>  ({url: `/v1/movies/search/${query}`, method: 'GET'})
    }),
    oneMovie: build.query<DBMovie, number>({
      query: (id) => ({url: `/v1/movies/id/${id}`, method: 'GET'}),
      transformResponse: (res: DBMovie[]) => res[0],
      providesTags: ['Movie']
    }),
    lastMovie: build.query<DBMovie[], void>({
      query: () => ({url: 'v1/movies/lastmovie', method: 'GET'})
    }),
    allMetrics: build.query<{[key: string]: string}, void>({
      query: () => ({url: '/v1/metrics', method: 'GET'}),
      transformResponse: (res: {[key: string]: string}[]) => res[0]
    }),
    refreshToken: build.query<refreshToken, void>({
      query: () =>  ({url: '/v1/refreshTokens', method: 'GET'}),
      providesTags: ['UserParams']
    }),
    movieReviews: build.query<Comment[], number>({
      query: (id) => ({url: `/v1/reviews/${id}/comments`, method: 'GET'}),
      providesTags: ['Reviews']
    }),
    postMovie: build.mutation<string, proposal>({
      query: ((proposal) => ({url: 'v1/movies/newmovie/', method: 'POST', body: proposal}))
    }), 
    metricsById: build.query<any, number>({
      query: (id:number) => ({url: `/v1/metrics/${id}`, method: 'GET'})
    }),
    userById: build.query<any, number>({
      query: (id:number) => ({url: `/v1/users/${id}`, method: 'GET'}),
      providesTags: ['UserParams']
    }),
    pendingProposalByUser: build.query<any, number>({
      query: (id:number) => ({url: `/v1/propositions/${id}`, method: 'GET'})
    }),
    availableSlots: build.query<slot[], void>({
      query: () => ({url: '/v1/propositions/availableSlots', method: 'GET'})  
    }),
    pendingProposition: build.query<any, any>({
      query: (id:number) => ({url: `/v1/propositions/hasPendingProposition/${id}`, method: 'GET'})
    }),
    bookSlot: build.mutation<string, string>({
      query: (data) => ({url: '/v1/propositions/book/', method: 'PUT', body: {
        publishing_date: data
      }})
    }),
    getUserReview: build.query<reviews, object>({
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
    adminPublishMovie: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/movies/publishing/${arg.movieId}`, method: 'PUT', body: arg.body}),
      invalidatesTags: ['Propositions'] 
    }),
    adminRevokeMovie: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/movies/${arg.movieId}`, method: 'DELETE'}),
      invalidatesTags: ['Propositions'] 
    }),
    adminPutUser: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/users/modify/${arg.userId}`, method: 'PUT', body: arg.body}),
      invalidatesTags: ['Users'] 
    }),
    adminDeleteUser: build.mutation<any, any>({
      query: (arg:any) => ({url : `/v1/users/${arg.userId}`, method: 'DELETE'}),
      invalidatesTags: ['Users'] 
    }),
    adminGetData: build.query<any, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const propositions = await fetchWithBQ('/v1/propositions/pendingPropositions');
        const users = await fetchWithBQ('/v1/users');
        return {data : {
          users: users.data,
          propositions: propositions.data
        }};
      },
      providesTags: ['Users', 'Propositions']
    })
  })
});

export const { 
  useAdminPublishMovieMutation,
  useAdminRevokeMovieMutation,
  useAdminGetDataQuery,
  useAdminPutUserMutation,
  useAdminDeleteUserMutation,
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserUpdateMutation,
  useUserUpdatePictureMutation,
  useFiltersQuery,
  useAllMoviesQuery,
  useOneMovieQuery,
  useLastMovieQuery,
  usePostMovieMutation,
  useAllMetricsQuery,
  useLazyRefreshTokenQuery,
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