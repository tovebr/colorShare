import React from 'react';
import { useSelector } from 'react-redux';

import { createPost } from '../../features/posts/postsSlice';
import PostForm from '../shared/PostForm';
import PostList from '../PostList';

const AllPosts = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className='page-container'>
      {auth.id && (
        <PostForm
          className='postform'
          buttontext='Post'
          onSubmit={createPost}
        />
      )}

      <PostList />
    </div>
  );
};

export default AllPosts;
