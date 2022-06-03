import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { url } from '../api';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const { data } = await axios.get(`${url}/posts`);
  return data.posts;
});

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${url}/posts/search?query=${searchTerm}` /* , {
        query: searchTerm,
      } */
      );
      return data.posts;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (formValues) => {
    const { data } = await axios.post(`${url}/posts`, formValues);

    return data;
  }
);
export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
  const { data } = await axios.patch(`${url}/posts/${post.id}`, {
    description: post.description,
    color: post.color,
  });
  return data;
});
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const { data } = await axios.delete(`${url}/posts/${id}`);
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
    [searchPosts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [searchPosts.fulfilled]: (state, action) => {
      state.status = 'success';
      state.posts = action.payload;
    },
    [searchPosts.rejected]: (state, action) => {
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
    [updatePost.pending]: (state, action) => {
      state.status = 'loading';
    },
    [updatePost.fulfilled]: (state, action) => {
      state.status = 'success';
      const posts = state.posts.filter((post) => post.id !== action.payload.id);
      state.posts = [...posts, action.payload];
    },
    [updatePost.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [deletePost.pending]: (state, action) => {
      state.status = 'loading';
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = 'success';
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
    [deletePost.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default postsSlice.reducer;
