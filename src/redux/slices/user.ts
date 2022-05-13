import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = { 
  isConnected: false,
  username: '',
  jwt: null,
  refresh_jwt: null,

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
  }
});


export const { 

} = userSlice.actions;

export default userSlice.reducer;