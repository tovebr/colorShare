import './App.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../features/auth/authSlice';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './shared/Nav';
import AllPosts from './pages/AllPosts';
import UserPage from './pages/UserPage';
import Login from './pages/Login';
import Register from './pages/Register';
import NewPost from './pages/NewPost';

function App() {
  const dispatch = useDispatch();

  // when component is mounted: loads user (if there is a jwt saved in localstorage)
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<AllPosts />} />
        <Route path='/posts/search' element={<AllPosts />} />
        <Route path='/newpost' element={<NewPost />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
