import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Cookies from 'js-cookie';

const initialState: UserState = { 
  isOnline: false,
  id: null,
  pseudo: '',
  role:'',
  access_jwt: null,
  refresh_jwt: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    setUser(state,action) {
      state.id = action.payload.id;
      state.pseudo = action.payload.pseudo;
      state.role = action.payload.role;
      state.access_jwt = Cookies.get('accessToken');
      state.refresh_jwt = Cookies.get('refreshToken');
      state.isOnline = true;
    },
    setJwts(state){
      console.log(state);
      
    },
    setConnectedStatus(state, action) {
      state.isOnline = action.payload;
    }
  }
});

export const isOnline = (state:RootState) : boolean => state.user.isOnline;
export const userLogged = (state: RootState) => state.user;
export const userJwts = (state:RootState) => { return {
  access_jwt: state.user.access_jwt,
  refresh_jwt: state.user.refresh_jwt
};};

export const { 
  setUser,
  setJwts,
  setConnectedStatus
} = userSlice.actions;

export default userSlice.reducer;