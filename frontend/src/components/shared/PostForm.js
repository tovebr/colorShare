import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../features/posts/postsSlice';

const PostForm = (props) => {
  const auth = useSelector((state) => state.auth);
  const postStatus = useSelector((state) => state.posts.status);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    description: props.post.description,
    color: props.post.color,
    isValid: props.post.isValid,
  });
  const [colorError, setColorError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const handleNewPost = () => {
    dispatch(
      props.onSubmit({
        description: formValues.description.toLowerCase(),
        color: formValues.color.toLowerCase(),
        userId: auth.id,
      })
    );
    if (postStatus === 'success') {
      setFormValues({ ...formValues, description: '', color: '' });
    }
  };

  const handleUpdatePost = async () => {
    await dispatch(
      props.onSubmit({
        id: props.post.id,
        description: formValues.description.toLowerCase(),
        color: formValues.color.toLowerCase(),
      })
    );
    dispatch(getPosts());
  };

  const handleInput = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const validateUserInput = () => {
    if (
      !String(formValues.color)
        .toLowerCase()
        .match(/^#([0-9a-f]{3}){1,2}$/i)
    ) {
      setColorError('You must enter a valid colorcode');
    } else {
      setColorError('');
    }

    if (!formValues.description) {
      setDescriptionError('You must enter a description');
    } else {
      setDescriptionError('');
    }

    if (colorError || descriptionError) {
      setFormValues({ ...formValues, isValid: false });
    } else {
      setFormValues({ ...formValues, isValid: true });
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    validateUserInput();

    if (props.mode === 'create' && formValues.isValid) {
      handleNewPost();
    } else if (props.mode === 'edit' && formValues.isValid) {
      handleUpdatePost();
    }
  };

  return (
    <form
      className={`postform ${props.mode === 'edit' ? 'postform-edit' : ''}`}
      onSubmit={(e) => handleSubmitClick(e)}
    >
      <div className='text-inputs'>
        <input
          type='text'
          id='color'
          placeholder='color'
          value={formValues.color}
          onChange={(e) => handleInput(e)}
        />
        {colorError && (
          <p className='error-message color-error'>{colorError}</p>
        )}
        <p className='postform-info'>
          The color must be written as a hex-code, ex #676767
        </p>
      </div>
      <textarea
        rows='5'
        id='description'
        placeholder='description'
        value={formValues.description}
        onChange={(e) => handleInput(e)}
      />
      {descriptionError && (
        <p className='error-message description-error'>{descriptionError}</p>
      )}
      <div className='button-div'></div>
      {props.mode === 'create' && (
        <button onClick={(e) => handleSubmitClick(e)}>
          {props.buttontext}
        </button>
      )}
      {props.mode === 'edit' && (
        <div className='button-div'>
          <button>Update Post</button>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default PostForm;
