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

  /**
   * Function that determines what should be displayed to the user
   * @returns {jsx} code to display to user
   */
  const renderContent = () => {
    if (
      (postStatus === 'success' &&
        posts.length > 0 &&
        selection === 'allUsers' &&
        usersStatus === 'success') ||
      (usersStatus === 'success' &&
        (postStatus === 'failed' || postStatus === null) &&
        posts.length > 0)
    ) {
      //if allusers posts should be shown
      return posts
        .map((post) => {
          // find the post-creator in the array of users and pass it along if found
          const user =
            users.length > 0
              ? users.find((user) => user.id === post.creator)
              : null;
          // get jsx for all posts
          return <PostItem key={post.id} post={post} user={user} auth={auth} />;
        })
        .reverse();
    } else if (
      postStatus === 'success' &&
      posts.length === 0 &&
      selection === 'allUsers' &&
      usersStatus === 'success'
    ) {
      // if there are no posts yet
      return (
        <div className='post'>
          <div className='post-content'>
            No posts yet! Log in or sign up to write the first one!
          </div>
        </div>
      );
    } else if (
      selection === 'oneUser' &&
      postStatus === 'success' &&
      user.posts.length > 0
    ) {
      // if only one users posts should be displayed find only that users posts
      return posts.map((post) => {
        if (post.creator === user.id) {
          // and return jsx for each post
          return <PostItem key={post.id} post={post} user={user} auth={auth} />;
        } else {
          return null;
        }
      });
    } else if (
      selection === 'oneUser' &&
      postStatus === 'success' &&
      user.posts.length === 0
    ) {
      // if only one users posts should be displayed but they havent posted anything yet
      return (
        <div className='post'>
          <div className='post-content'>User has not posted anything yet</div>
        </div>
      );
    } else if (
      postStatus === 'loading' ||
      usersStatus === 'loading' ||
      authStatus === null
    ) {
      // if posts are being retrieved
      return (
        <div className='post'>
          <div className='post-content'>Loading...</div>
        </div>
      );
    } else if (
      (postStatus === 'success' && posts.length === 0) ||
      postStatus === 'failed' ||
      postStatus === null
    ) {
      // if no posts where found or request was unsuccessfull
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
