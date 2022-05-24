import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import globalSlice from './slices/global';
import interactionSlice from './slices/interaction';
import filterSlice from './slices/filter';
import userSlice from './slices/user';
import { api } from './api';
import { apiTmdb } from './apiTmdb';
import proposalSlice from './slices/proposal';
import { rtkQueryErrorLogger } from './middleware/refreshToken';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    interaction: interactionSlice,
    filter: filterSlice,
    proposal: proposalSlice,
    user: userSlice,
    [api.reducerPath]: api.reducer,
    [apiTmdb.reducerPath]: apiTmdb.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, apiTmdb.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
