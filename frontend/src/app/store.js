import { configureStore } from '@reduxjs/toolkit';
import usersReducers from '../features/users/usersSlice';
import postReducers from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducers,
    posts: postReducers,
  },
});
