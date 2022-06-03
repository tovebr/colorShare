import { configureStore } from '@reduxjs/toolkit';
import usersReducers from '../features/users/usersSlice';
import postReducers from '../features/posts/postsSlice';
import authReducers from '../features/auth/authSlice';

// This function creates the redux-store combining all reducers
export const store = configureStore({
  reducer: {
    users: usersReducers,
    posts: postReducers,
    auth: authReducers,
  },
});
