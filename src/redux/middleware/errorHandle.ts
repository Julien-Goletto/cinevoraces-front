import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit'
import { addToast } from 'redux/slices/global';


/**
 * Log a warning and show a toast!
 */
export const errorHandle: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {

    if (isRejectedWithValue(action)) {
      if(action.payload.status === 400) {
        api.dispatch(addToast({type: 'error', text: `${action.payload.data.error}`}));
      }
    }

    return next(action);
  };