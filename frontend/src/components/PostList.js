import React from 'react';
import { useSelector } from 'react-redux';

import PostItem from './PostItem';

const PostList = () => {
  const posts = useSelector((state) => state.posts.posts);

  const renderedPosts = posts
    .map((post) => <PostItem key={post.id} post={post} />)
    .reverse();

  return <div>{posts ? renderedPosts : 'No posts found'}</div>;
};

export default PostList;
