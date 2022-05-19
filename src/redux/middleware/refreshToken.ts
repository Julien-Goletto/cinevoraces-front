import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import { setOffline } from 'redux/slices/user';
import { api } from '../api';

export const rtkQueryErrorLogger: Middleware =
  (apiAction: MiddlewareAPI) => (next) => (action) => {
    
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.log(action);
      
      if(action.meta.arg.endpointName !== 'refreshToken' && action.payload.originalStatus === 401) {
        apiAction.dispatch((api.endpoints.refreshToken.initiate() as any))
          .then((res:any) => {
            console.log(res);
            
            if(res.error) {
              apiAction.dispatch(setOffline());
              return;
            }

          });
      }
    }
    return next(action);
  };