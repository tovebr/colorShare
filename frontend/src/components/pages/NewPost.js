import React from 'react';
import PostForm from '../shared/PostForm';

import { createPost } from '../../features/posts/postsSlice';

const NewPost = () => {
  // page that holds form for creating new post
  return (
    <div className='flex-centered'>
      <PostForm
        mode='create'
        className='postform'
        buttontext='Post'
        // pass on action creator to form-component
        onSubmit={createPost}
      />
    </div>
  );
};

export default NewPost;
