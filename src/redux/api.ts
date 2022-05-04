import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Creations = {
  data: Array<object>
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.e-anthony.fr/' /* https://api.themoviedb.org/3/configuration?api_key=319bf20e26c103de9dd61d22f63c0419 */
  }),
  endpoints: (build) => ({
    getCreations: build.query<Creations, void | ''>({
      query: () => {
        console.log('ça fetch');
        
        return ({ url: 'creations' });
      }
    }),
    setCreation: build.mutation<Creations, void>({
      query: () => ({ url: 'creations', method: 'POST', body: ''})
    })
  })
});


export const { 
  useGetCreationsQuery,
  useSetCreationMutation
} = api;