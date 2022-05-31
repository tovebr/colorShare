import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AuthorHeader from './AuthorHeader';
import Modal from './shared/Modal';
import './PostItem.scss';
import { updatePost } from '../features/posts/postsSlice';

const PostItem = ({ post, auth, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('');

  const openModalHandler = (action) => {
    setModalMode(action);
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

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
