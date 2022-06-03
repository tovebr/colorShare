import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Logo from './logo.png';

import { logoutUser } from '../../features/auth/authSlice';

import './Nav.scss';

const Nav = () => {
  // gets data on logged-in user (if there is one)
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // if log out-button is clicked, log out-action is dispatched
  const logOutHandler = () => {
    dispatch(logoutUser());
  };

  // different content is rendered depending on if a user is loged in
  return (
    <nav className='navbar'>
      <div className='navbar-items page-container'>
        <Link className='navbar-logo-link' to='/'>
          <img className='navbar-logo' src={Logo} alt='logo' />
        </Link>
        <div className='navbar-links'>
          {' '}
          <Link to='/'>All posts</Link>
          {auth.id && (
            <React.Fragment>
              <Link to={`/newpost`}>New post</Link>
              <Link to={`/users/${auth.id}`}>My page</Link>
              <button className='logout-button' onClick={logOutHandler}>
                Log out
              </button>
            </React.Fragment>
          )}
          {!auth.id && <Link to='/auth/login'>Log In</Link>}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
