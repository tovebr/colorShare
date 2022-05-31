import React from 'react';
import { useSelector } from 'react-redux';

import PostItem from './PostItem';

const PostList = ({ selection, user }) => {
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const users = useSelector((state) => state.users.users.users);
  const usersStatus = useSelector((state) => state.users.users.status);
  const auth = useSelector((state) => state.auth);
  const authStatus = useSelector((state) => state.auth.status);

  const renderContent = () => {
    if (postStatus === 'success') {
      if (selection === 'allUsers' && usersStatus === 'success') {
        return posts
          .map((post) => {
            const user =
              users.length > 0
                ? users.find((user) => user.id === post.creator)
                : null;
            return (
              <PostItem key={post.id} post={post} user={user} auth={auth} />
            );
          })
          .reverse();
      } else if (selection === 'oneUser') {
        return posts.map((post) => {
          if (post.creator === user.id) {
            return (
              <PostItem key={post.id} post={post} user={user} auth={auth} />
            );
          } else {
            return null;
          }
        });
      }
    } else if (
      postStatus === 'loading' ||
      usersStatus === 'loading' ||
      authStatus === null
    ) {
      return (
        <div className='post'>
          <div className='post-content'>Loading...</div>
        </div>
      );
    } else if (postStatus === 'failed' || postStatus === null) {
      return (
        <div className='post'>
          <div className='post-content'>No posts found</div>
        </div>
      );
    }
  };

  const renderedContent = renderContent();

  return <React.Fragment>{renderedContent}</React.Fragment>;
};

export default PostList;
