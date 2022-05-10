import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import globalSlice from './slices/global';
import interactionSlice from './slices/interaction';
import filterSlice from './slices/filter';
import { api } from './api';
import proposalSlice from './slices/proposal';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    interaction: interactionSlice,
    filter: filterSlice,
    proposal: proposalSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
