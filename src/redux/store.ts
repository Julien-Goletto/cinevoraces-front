import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterSlice from './slices/counter';
import { api } from './api';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
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
