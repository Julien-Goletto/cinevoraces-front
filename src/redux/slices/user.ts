import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = { 
  username: null,
  pic_profil: null
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  }
});

export const getCount = (state: RootState) => state.counter.value;

export const {  } = userSlice.actions;
export default userSlice.reducer;