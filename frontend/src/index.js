import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';

import './index.scss';
import App from './components/App';
import { getUsers } from './features/users/usersSlice';
import { getPosts } from './features/posts/postsSlice';

store.dispatch(getPosts());
store.dispatch(getUsers());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
