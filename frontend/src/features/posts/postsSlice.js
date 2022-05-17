import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const { data } = await axios.get('http://localhost:5000/colors/posts');
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
  },
});

export default postsSlice.reducer;
