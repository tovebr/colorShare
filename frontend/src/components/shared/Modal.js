import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import PostForm from './PostForm';
import { deletePost, getPosts } from '../../features/posts/postsSlice';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../features/users/usersSlice';
import Backdrop from './Backdrop';

const ModalOverlay = (props) => {
  const dispatch = useDispatch();

  // if delete-button is clicked the delete-action is dispatched
  const handleDeleteClick = async () => {
    dispatch(deletePost(props.post.id));
  };

  // populating modal with correct content
  const content = (
    <div className='modal flex-centered'>
      {props.mode === 'edit' && <PostForm {...props} />}
      {props.mode === 'delete' && (
        <React.Fragment>
          <div className='delete-form'>
            <h3>Are you sure you want to delete this post? </h3>
            <div className='button-div'>
              <button type='button' onClick={handleDeleteClick}>
                Delete
              </button>
              <button type='button' onClick={props.onCancel}>
                Cancel
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

// combines the two modal-pieces backdrop and modaloverlay to become a full modal
const Modal = (props) => {
  if (!props.show) return null;
  return (
    <div>
      <Backdrop {...props} />
      <ModalOverlay {...props} />
    </div>
  );
};

export default Modal;
