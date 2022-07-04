import type { RootState } from 'redux/store';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type UserState = { 
  isOnline: boolean,
  id: number,
  pseudo: string,
  mail: string,
  avatar: string,
  role: string,
  accessToken: string | null | undefined,
  refreshToken: string | null | undefined,
};

const initialState: UserState = { 
  isOnline: false,
  id: NaN,
  pseudo: '',
  mail: '',
  role: '',
  avatar: '',
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    setUser(state, action) {
      state.isOnline = true;
      state.id = action.payload.id;
      state.pseudo = action.payload.pseudo;
      state.mail = 'fixme@fix.fix';
      state.role = action.payload.role;
      state.avatar = action.payload.avatar;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      Cookies.set('accessToken',action.payload.accessToken);
      Cookies.set('refreshToken',action.payload.refreshToken);
    },
    setToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setConnectedStatus(state, action) {
      state.isOnline = action.payload;
    },
    setOffline: () => {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      return initialState;
    },
    setUsername (state, action) {
      state.pseudo = action.payload.pseudo;
    },
    setAvatar (state, action) {
      state.avatar = action.payload.avatar_url;
    }
  }
});

export const userState = (state: RootState) => state.user;
export const userToken = (state:RootState) => { return {
  accessToken: state.user.accessToken,
  refreshToken: state.user.refreshToken
};};

export const { 
  setUser,
  setAvatar,
  setUsername,
  setToken,
  setConnectedStatus,
  setOffline
} = userSlice.actions;

export default userSlice.reducer;