import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { url } from '../api';

/**
 * REDUX TOOLKIT
 * posts slice
 * handles all api-requests regarding posts, getting, updating creating and deleteing
 * and saves to store
 * the slices in this project has different syntaxes
 * as i wanted to learn different ways to write it
 */

// gets all users in database
export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const { data } = await axios.get(`${url}/users`);
  return data.users;
});

// gets one user by Id
export const getUser = createAsyncThunk('users/getUser', async (id) => {
  const { data } = await axios.get(`${url}/users/${id}`);
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {
      users: [],
      status: null,
    },
    user: {
      user: null,
      status: null,
    },
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      /* state.status = 'loading'; */
      state.users.status = 'loading';
    },
    [getUsers.fulfilled]: (state, action) => {
      /* state.status = 'success';
      state.users = action.payload; */
      state.users.status = 'success';
      state.users.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.status.users = 'failed';
    },
    [getUser.pending]: (state, action) => {
      state.user.status = 'loading';
    },
    [getUser.fulfilled]: (state, action) => {
      state.user.status = 'success';
      state.user.user = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.user.status = 'failed';
    },
  },
});

export default usersSlice.reducer;
