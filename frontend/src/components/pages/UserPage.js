import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPosts } from '../../features/posts/postsSlice';
import { getUser, getUsers } from '../../features/users/usersSlice';
import PostList from '../PostList';
import './UserPage.scss';

const UserPage = ({ selection }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.users.user.user);
  const posts = useSelector((state) => state.posts.posts);
  const userStatus = useSelector((state) => state.users.user.status);
  const postsStatus = useSelector((state) => state.posts.status);

  /**
   * This useEffect will run when the component has mounted
   * it dispatches the actions to redux that will execute the api-request that gets user and posts from the backend
   */
  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getPosts());
  }, []);

  /**
   * Function that returns users name with first letter caped
   * @param  {String} string users name from database
   * @return {String} users name with caps
   */
  const casedName = (string) => {
    let casedString = '';

    //If-statment determins wether the name has one word or more
    if (string.includes(' ')) {
      // splits it on blankspace and than splits every word on the first letter,
      // first letter is caped and then reunited with the other part of the name
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
      {(userStatus === 'failed' || postsStatus === 'failed') && (
        <div className='user-card post'>Could not find user</div>
      )}
    </div>
  );
};

export default UserPage;
