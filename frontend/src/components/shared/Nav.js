import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Logo from './logo.png';

import { logoutUser } from '../../features/auth/authSlice';

import './Nav.scss';

const Nav = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <nav className='navbar'>
      <div className='navbar-items page-container'>
        <Link className='navbar-logo-link' to='/'>
          <img className='navbar-logo' src={Logo} alt='logo' />
        </Link>
        <div className='navbar-links'>
          {' '}
          <Link to='/'>Home</Link>
          {auth.id && <Link to={`/users/${auth.id}`}>My page</Link>}
          {auth.id && (
            <button className='logout-button' onClick={logOutHandler}>
              Log out
            </button>
          )}
          {!auth.id && <Link to='/auth/login'>Log In</Link>}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
