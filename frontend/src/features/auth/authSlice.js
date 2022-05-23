import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { url } from '../api';

const initialState = {
  jwt: localStorage.getItem('jwt'),
  name: '',
  email: '',
  id: '',
  error: null,
  status: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/auth/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      localStorage.setItem('jwt', data.jwt);
      return data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/auth/login`, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem('jwt', data.jwt);
      return data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser(state, action) {
      const jwt = state.jwt;

      if (jwt) {
        const user = jwtDecode(jwt);
        return {
          ...state,
          name: user.name,
          email: user.email,
          id: user.id,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem('jwt');
      return {
        ...state,
        jwt: '',
        name: '',
        email: '',
        id: '',
        error: null,
        status: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, status: 'pending' };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload.jwt);
        return {
          ...state,
          jwt: action.payload.jwt,
          name: user.name,
          email: user.email,
          id: user.id,
          status: 'success',
          error: '',
        };
      } else {
        return state;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return { ...state, status: 'failed' };
    });
    builder.addCase(registerUser.pending, (state, action) => {
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload.jwt);
        return {
          ...state,
          jwt: action.payload.jwt,
          name: user.name,
          email: user.email,
          id: user.id,
          status: 'success',
          error: '',
        };
      } else {
        return state;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
