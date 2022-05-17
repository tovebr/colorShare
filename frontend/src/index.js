import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
