import type { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { RootState } from 'redux/store';
import { createApi, FetchArgs, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { setOffline, setUser } from 'redux/slices/user';
import Cookies from 'js-cookie';

const baseQuery = retry(fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API,
  prepareHeaders: (headers, {getState, endpoint}) => {
    const accessToken = (getState() as RootState).user.accessToken;
    const refreshToken = Cookies.get('refreshToken');
    if (headers.get('authorization')) return headers;
    if (endpoint === 'refreshToken') headers.set('authorization', `Bearer ${refreshToken}`);
    if (accessToken && endpoint !== 'refreshToken') headers.set('authorization', `Bearer ${accessToken}`);
    return headers;
  }}), {maxRetries: 0});
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args, api, extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && 'status' in result.error && result.error.status === 401) {
    // try to get a new token
    const refreshToken = Cookies.get('refreshToken');
    const refreshResult = await baseQuery({url: 'v1/refreshTokens', headers: {
      'authorization': `Bearer ${refreshToken}`
    }}, api, extraOptions);

    if (refreshResult.data) { // Store the new token
      api.dispatch(setUser(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else { // Disconnect user
      api.dispatch(setOffline());
    }}
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth, tagTypes: ['Movie', 'Reviews', 'Propositions', 'Users', 'UserParams'],
  endpoints: (build) => ({
    userRegister: build.mutation<string, {[key: string]: string}>({
      query: (user) => ({ url: '/v1/users/register', method:'POST', body: user })
    }),
    userLogin: build.mutation<user, {[key: string]: string}>({
      query: (user) => ({ url: '/v1/users/login', method:'POST', body: user}),
    }),
    userUpdate: build.mutation<string, {userId: number, user: {[key: string]: string}}>({
      query: ({user, userId}) => ({url: `v1/users/modify/${userId}`, method: 'PUT', body: user}),
      invalidatesTags: ['UserParams'] 
    }),
    userUpdatePicture: build.mutation<void, {userId: id, formData: FormData}>({
      query: ({userId, formData}) => ({url: `v1/users/addProfilePic/${userId}`, method: 'PUT', body: formData}),
      invalidatesTags: ['UserParams'] 
    }),
    filters: build.query<DBFilters[], void>({
      query: () => ({url: '/v1/metrics/filters', method: 'GET'})
    }),
    allMovies: build.query<DBMovie[], string>({
      query: (query) =>  ({url: `/v1/movies/search/${query}`, method: 'GET'})
    }),
    oneMovie: build.query<DBMovie, id>({
      query: (id) => ({url: `/v1/movies/id/${id}`, method: 'GET'}),
      transformResponse: (res: DBMovie[]) => res[0],
      providesTags: ['Movie']
    }),
    lastMovie: build.query<DBMovie, void>({
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
    movieReviews: build.query<Comment[], id>({
      query: (id) => ({url: `/v1/reviews/${id}/comments`, method: 'GET'}),
      providesTags: ['Reviews']
    }),
    postMovie: build.mutation<string, {[key: string]: string | number}>({
      query: (body => ({url: 'v1/movies/newmovie/', method: 'POST', body: body}))
    }), 
    metricsById: build.query<{[key: string]: number}[], id>({
      query: (id) => ({url: `/v1/metrics/${id}`, method: 'GET'})
    }),
    userById: build.query<{[key: string]: string}, id>({
      query: (id) => ({url: `/v1/users/${id}`, method: 'GET'}),
      providesTags: ['UserParams']
    }),
    pendingProposalByUser: build.query<DBProposal, id>({
      query: (id) => ({url: `/v1/propositions/${id}`, method: 'GET'}),
    }),
    availableSlots: build.query<slot[], void>({
      query: () => ({url: '/v1/propositions/availableSlots', method: 'GET'})  
    }),
    pendingProposition: build.query<DBProposal[], number>({
      query: (id) => ({url: `/v1/propositions/hasPendingProposition/${id}`, method: 'GET'})
    }),
    bookSlot: build.mutation<string, {publishing_date: string}>({
      query: (body) => ({url: '/v1/propositions/book/', method: 'PUT', body: body})
    }),
    getUserReview: build.query<DBReviews, {userId: id, movieId: id}>({
      query: ({userId, movieId}) => ({url: `/v1/reviews/${userId}/${movieId}`, method: 'GET'}),
      providesTags: ['Reviews']
    }),
    postInteraction: build.mutation<string, {userId: id, movieId: id}>({
      query: ({userId, movieId}) => ({url : `/v1/reviews/${userId}/${movieId}`, method: 'POST'})   
    }),
    putInteraction: build.mutation<string, {userId: id, movieId: id, body: interactionBody}>({
      query: ({userId, movieId, body}) => ({url : `/v1/reviews/${userId}/${movieId}`, method: 'PUT', body: body}),
      invalidatesTags: ['Movie', 'Reviews'] 
    }),
    adminPublishMovie: build.mutation<string, {movieId: id, body: {isPublished: boolean}}>({
      query: ({movieId, body}) => ({url: `/v1/movies/publishing/${movieId}`, method: 'PUT', body: body}),
      invalidatesTags: ['Propositions'] 
    }),
    adminRevokeMovie: build.mutation<string, {movieId: id}>({
      query: ({movieId}) => ({url : `/v1/movies/${movieId}`, method: 'DELETE'}),
      invalidatesTags: ['Propositions'] 
    }),
    adminPutUser: build.mutation<string, {userId: id, body: {role: string}}>({
      query: ({userId, body}) => ({url : `/v1/users/modify/${userId}`, method: 'PUT', body: body}),
      invalidatesTags: ['Users'] 
    }),
    adminDeleteUser: build.mutation<string, {userId: id}>({
      query: ({userId}) => ({url : `/v1/users/${userId}`, method: 'DELETE'}),
      invalidatesTags: ['Users'] 
    }),
    adminGetData: build.query<{propositions: DBProposal[], users: DBUser[]}, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const propositions = await fetchWithBQ('/v1/propositions/pendingPropositions');
        const users = await fetchWithBQ('/v1/users');
        return {data : {
          users: users.data as DBUser[],
          propositions: propositions.data as DBProposal[]
        }};
      },
      providesTags: ['Users', 'Propositions']
    }),
  })});

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