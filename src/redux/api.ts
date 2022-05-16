import { RootState } from './store';
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
    refreshToken: build.mutation<any, string>({
      query: (refreshToken?:string) => {
        return ({url: '/v1/refreshTokens', method: 'GET', credentials: 'include', headers: {
          authorization: `Bearer ${refreshToken}`
        },
        transformResponse: (res:any, meta:any, arg:any) =>{
          console.log(res.data);
          
        }
        });
      }
    })
  })
});

export const { 
  useUserRegisterMutation,
  useUserLoginMutation,
  useAllMoviesQuery,
  useOneMovieQuery,
  useAllMetricsQuery,
  useRefreshTokenMutation
} = api;