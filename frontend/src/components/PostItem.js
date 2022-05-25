import React from 'react';
import { useSelector } from 'react-redux';

import AuthorHeader from './AuthorHeader';
import './PostItem.scss';

const PostItem = ({ post }) => {
  const users = useSelector((state) => state.users.users);
  const auth = useSelector((state) => state.auth);

  const user = users.find((user) => user.id === post.creator);

  const casedDescription = (description) => {
    return description.slice(0, 1).toUpperCase() + description.slice(1);
  };

  return (
    <div className='post'>
      <div className='post-content'>
        <div className='post-info'>
          <p className='post-description'>
            {casedDescription(post.description)}
          </p>
          {user ? (
            <AuthorHeader key={user.id} user={user} />
          ) : (
            <p className='post-author'>Unknown Author</p>
          )}
        </div>
        <div
          className='post-colorsample'
          style={{ backgroundColor: post.color }}
        ></div>
      </div>
      {auth.id === user.id && (
        <div className='post-buttons'>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostItem;
