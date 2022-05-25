import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { url } from '../api';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const { data } = await axios.get(`${url}/users`);
  return data.users;
});
export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  const { data } = await axios.patch(`${url}/users/${user.id}`);
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: null,
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = 'success';
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [updateUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = 'success';
      const { id } = action.payload;
      const users = state.users.filter((post) => post.id !== id);
      state.users = [...users, action.payload];
    },
    [updateUser.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default usersSlice.reducer;
