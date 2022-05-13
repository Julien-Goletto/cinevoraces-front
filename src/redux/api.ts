import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type User = {
  pseudo: string,
  mail: string,
  password: string
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API
  }),
  endpoints: (build) => ({
    userRegister: build.mutation<User, any>({
      query: (user:User) => ({ url: '/v1/users/register', method:'POST', body: user })
    })
  })
});


export const { 
  useUserRegisterMutation
} = api;