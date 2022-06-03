import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AuthorHeader from './AuthorHeader';
import Modal from './shared/Modal';
import './PostItem.scss';
import { updatePost } from '../features/posts/postsSlice';

const PostItem = ({ post, auth, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('');

  /**
   * is envoked when buttons on postitem is clicked
   * @param  {String} action describes what button user clicked and therefore what function modal should have
   */
  const openModalHandler = (action) => {
    setModalMode(action);
    // set s modal to be open
    setShowModal(true);
  };

  // is envoked
  const closeModalHandler = () => {
    // sets modal to be closed
    setShowModal(false);
  };

  /**
   * Returns users description with first letter capitalized
   * @param  {String} description users description on the post
   * @return {String} string with first letter caped
   */
  const casedDescription = (description) => {
    return description.slice(0, 1).toUpperCase() + description.slice(1);
  };

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        mode={modalMode}
        post={{ ...post, isValid: true }}
        auth={auth}
        onCancel={closeModalHandler}
        onSubmit={updatePost}
      />
      <div className='post'>
        <div className='post-content'>
          <div className='post-info'>
            <p className='post-description'>
              {casedDescription(post.description)}
            </p>
            <p className='post-hexcode'>{post.color}</p>

            <AuthorHeader key={user.id} user={user} />
          </div>
          <div
            className='post-colorsample'
            style={{ backgroundColor: post.color }}
          ></div>
        </div>
        {auth.status === 'success' && auth.id === user.id && (
          <div className='post-buttons'>
            <button onClick={() => openModalHandler('edit')}>Edit</button>
            <button onClick={() => openModalHandler('delete')}>Delete</button>
          </div>
        )}
        {auth.status === null && null}
      </div>
    </React.Fragment>
  );
};

export default PostItem;
