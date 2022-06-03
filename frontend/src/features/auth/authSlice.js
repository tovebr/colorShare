import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { url } from '../api';

/**
 * REDUX TOOLKIT
 * authentication slice
 * handles all api-requests regarding authentification
 * the slices in this project has different syntaxes
 * as i wanted to learn different ways to write it
 */

const initialState = {
  jwt: localStorage.getItem('jwt'),
  name: '',
  email: '',
  id: '',
  error: null,
  status: null,
};

// action that registers user (made with createAsyncThunk that makes async requests possible with redux)
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (values, { rejectWithValue }) => {
    try {
      // makes api-request with arguments passed in
      const { data } = await axios.post(`${url}/auth/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      // stores returned jwt in localstorage
      localStorage.setItem('jwt', data.jwt);
      return data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

// action that logs in user
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
          status: 'success',
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
  // extraReducers are reducers that handle async functions
  // they set status and stores returned data
  extraReducers: (builder) => {
    // if request is pending
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, status: 'pending' };
    });
    // if request was successfull
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
    // if request was rejected
    builder.addCase(loginUser.rejected, (state, action) => {
      return { ...state, status: 'failed', error: action.payload };
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
