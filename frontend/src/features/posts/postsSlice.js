import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { url } from '../api';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const { data } = await axios.get(`${url}/posts`);
  return data.posts;
});
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (formValues) => {
    const { data } = await axios.post(`${url}/posts`, formValues);

    return data;
  }
);
export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
  const { data } = await axios.patch(`${url}/posts/${post.id}`);
  return data;
});
export const deletePost = createAsyncThunk('posts/deletePost', async () => {
  const { data } = await axios.delete(`${url}/posts`);
  return data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: null,
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = 'success';
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [createPost.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = 'success';
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default postsSlice.reducer;
