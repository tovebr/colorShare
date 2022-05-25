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

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<AllPosts />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
