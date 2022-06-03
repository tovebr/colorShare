import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPosts } from '../../features/posts/postsSlice';

const PostForm = (props) => {
  const auth = useSelector((state) => state.auth);
  const postStatus = useSelector((state) => state.posts.status);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    description: '',
    color: '',
    isValid: false,
  });
  const [colorError, setColorError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  console.log(props.url);
  useEffect(() => {
    if (props.mode === 'edit') {
      setFormValues({
        ...formValues,
        description: props.post.description,
        color: props.post.color,
        isvalid: props.post.isValid,
      });
    }
  }, []);

  const handleNewPost = () => {
    dispatch(
      props.onSubmit({
        description: formValues.description.toLowerCase(),
        color: formValues.color.toLowerCase(),
        userId: auth.id,
      })
    );
    if (postStatus === 'success') {
      setFormValues({
        ...formValues,
        description: '',
        color: '',
        isValid: false,
      });
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

  const validateUserInput = (id) => {
    if (id === 'color') {
      if (
        !String(formValues.color)
          .toLowerCase()
          .match(/^#([0-9a-f]{3}){1,2}$/i)
      ) {
        setColorError('You must enter a valid colorcode');
        console.log('color bad');
      } else {
        console.log('color good');
        setColorError('');
      }
    } else if (id === 'description') {
      if (!formValues.description) {
        console.log('desc bad');
        setDescriptionError('You must enter a description');
        console.log(descriptionError);
      } else {
        console.log('desc good');
        setDescriptionError('');
      }
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    validateUserInput('color');
    validateUserInput('description');

    if (
      !colorError &&
      !descriptionError &&
      formValues.color &&
      formValues.description
    ) {
      if (props.mode === 'create') {
        console.log(formValues, 'handlesubmitclick');
        handleNewPost();
      } else if (props.mode === 'edit') {
        handleUpdatePost();
      }

      if (props.url !== '/') {
        props.setUrl();
      }
    } else {
    }
  };

  return (
    <form
      className={`postform ${props.mode === 'edit' ? 'postform-edit' : ''}`}
      onSubmit={(e) => handleSubmitClick(e)}
    >
      <h3>What color is on your mind?</h3>
      <div className='text-inputs'>
        <input
          type='text'
          id='color'
          placeholder='color'
          value={formValues.color}
          onChange={(e) => handleInput(e)}
          onBlur={(e) => validateUserInput(e.target.id)}
        />
        {colorError && (
          <p className='error-message color-error'>{colorError}</p>
        )}
        <div className='postform-info'>
          <p>The color must be written as a hex-code, ex #676767</p>
          <a target='_blank' href='https://htmlcolorcodes.com/color-picker/'>
            Find your hex-code here
          </a>
        </div>
      </div>
      <input
        type='text'
        id='description'
        placeholder='description'
        value={formValues.description}
        onChange={(e) => handleInput(e)}
        onBlur={(e) => validateUserInput(e.target.id)}
      />
      {descriptionError && (
        <p className='error-message description-error'>{descriptionError}</p>
      )}

      {props.mode === 'create' && (
        <button onClick={(e) => handleSubmitClick(e)}>
          {props.buttontext}
        </button>
      )}

      {props.mode === 'edit' && (
        <div className='button-div'>
          <button onClick={(e) => handleSubmitClick(e)}>Update Post</button>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default PostForm;
