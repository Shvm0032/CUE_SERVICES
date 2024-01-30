// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';

const initialState = {
  isLoggedIn: authService.getAuthUser() ? true : false,
  // other authentication-related state if needed
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
