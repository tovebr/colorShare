import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPosts } from '../../features/posts/postsSlice';
import { getUser, getUsers } from '../../features/users/usersSlice';
import PostList from '../PostList';
import './UserPage.scss';

const UserPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.users.user.user);
  const userStatus = useSelector((state) => state.users.user.status);
  const postsStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    dispatch(getUser(id));
    if (postsStatus === null) {
      dispatch(getPosts());
    }
  }, []);

  const casedName = (string) => {
    let casedString = '';

    /* If-statment determins wether the name has one word or more */
    if (string.includes(' ')) {
      string.split(' ').forEach((word) => {
        casedString += word.slice(0, 1).toUpperCase() + word.slice(1) + ' ';
      });
    } else {
      casedString = string.slice(0, 1).toUpperCase() + string.slice(1);
    }
    return casedString;
  };

  return (
    <div className='page-container'>
      {userStatus === 'success' && postsStatus === 'success' && (
        <React.Fragment>
          <div className='flex-centered'>
            <div className='user-card post'>
              <h3>{casedName(user.name)}</h3>
              <p>{`Number of posts: ${user.posts.length}`} </p>
            </div>
          </div>

          <PostList selection='oneUser' user={user} />
        </React.Fragment>
      )}
      {userStatus === 'loading' && postsStatus === 'loading' && (
        <div className='user-card post'>Loading...</div>
      )}
      {userStatus === 'loading' && postsStatus === 'success' && (
        <div className='user-card post'>Loading...</div>
      )}
      {userStatus === 'success' && postsStatus === 'loading' && (
        <div className='user-card post'>Loading...</div>
      )}
      {userStatus === 'failed' && postsStatus === 'failed' && (
        <div className='user-card post'>Could not find user</div>
      )}
    </div>
  );
};

export default UserPage;
