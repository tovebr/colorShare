import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  getPosts,
  createPost,
  searchPosts,
} from '../../features/posts/postsSlice';
import { getUsers } from '../../features/users/usersSlice';
import PostForm from '../shared/PostForm';
import PostList from '../PostList';
import FilterOptions from '../FilterOptions';

import './AllPosts.scss';

const AllPosts = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  /* const url = window.location.pathname; */
  const [url, setUrl] = useState(window.location.pathname);
  const [activeButton, setActiveButton] = useState('');

  /**
   * This useEffect will run when the component has mounted
   * it dispatches the actions to redux that will execute the api-request that gets users and posts from the backend
   */
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
  }, [dispatch]);

  /**
   * This function is envoked by a user pressing buttons that searches the database
   * for posts with the buttons that value
   * @param  {String} searchTerm The value the user want to search the database for
   */
  const handleSearchClick = (searchTerm) => {
    // if reset-button is clicked there is no searchTerm and allPosts will be fetched
    if (!searchTerm) {
      dispatch(getPosts());
      resetUrl();
      setUrl('/');
    } else {
      //if there is a serachterm action to search database is dispatched
      dispatch(searchPosts(searchTerm));
      // and url is altered accordingly
      navigate(`/posts/search?query=${searchTerm}`);
      setActiveButton(searchTerm);
      setUrl(window.location.pathname);
    }
  };

  const resetUrl = () => {
    navigate('/');
    dispatch(getPosts());
  };

  return (
    <div className='page-container'>
      {!auth.id && (
        <div className='flex-centered'>
          <div className='welcome post'>
            <p className='welcome-intro'>welcome to</p>
            <p className='welcome-heading'>Colorshare</p>
            <p className='welcome-text'>
              The place to share and save your favourite colors and to be
              inspired by others!
            </p>
          </div>
        </div>
      )}
      {auth.id && (
        <div className='flex-centered'>
          <PostForm
            mode='create'
            className='postform'
            buttontext='Post'
            onSubmit={createPost}
            setUrl={resetUrl}
            url={url}
          />
        </div>
      )}
      <div className='flex-centered'>
        <div className='posts-holder'>
          <FilterOptions
            activeButton={activeButton}
            handleClick={handleSearchClick}
            url={url}
          />
          <PostList selection='allUsers' />
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
