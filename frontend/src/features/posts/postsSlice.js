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

// action that gets all posts (made with createAsyncThunk that makes async requests possible with redux)
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const { data } = await axios.get(`${url}/posts`);
  return data.posts;
});

// action that will search database for posts with text-values provided by user
export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${url}/posts/search?query=${searchTerm}`
      );
      return data.posts;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// action that creates a new post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (formValues) => {
    console.log('create');
    const { data } = await axios.post(`${url}/posts`, formValues);

    return data;
  }
);

// action that updates post
export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
  const { data } = await axios.patch(`${url}/posts/${post.id}`, {
    description: post.description,
    color: post.color,
  });
  return data;
});

// action that deletes post
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
    // extraReducers are reducers that handle async functions
    // they set status and stores returned data
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
