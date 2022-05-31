import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPosts, createPost } from '../../features/posts/postsSlice';
import { getUsers } from '../../features/users/usersSlice';
import PostForm from '../shared/PostForm';
import PostList from '../PostList';

const AllPosts = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className='page-container'>
      {auth.id && (
        <div className='flex-centered'>
          <PostForm
            mode='create'
            className='postform'
            buttontext='Post'
            onSubmit={createPost}
            post={{ description: '', color: '', isValid: false }}
          />
        </div>
      )}

      <PostList selection='allUsers' />
    </div>
  );
};

export default AllPosts;
