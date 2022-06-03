import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  //if component is mounted with already existing post to edit that post will be set to state
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

  // if form is createing new post: create post-action will be dispatched with userinputs
  const handleNewPost = () => {
    dispatch(
      props.onSubmit({
        description: formValues.description.toLowerCase(),
        color: formValues.color.toLowerCase(),
        userId: auth.id,
      })
    );

    // clear inputfields if creation is successfull
    if (postStatus === 'success') {
      setFormValues({
        ...formValues,
        description: '',
        color: '',
        isValid: false,
      });
    }
  };

  // if form is updating previous post: update post-action will be dispatched with userinputs
  const handleUpdatePost = async () => {
    await dispatch(
      props.onSubmit({
        id: props.post.id,
        description: formValues.description.toLowerCase(),
        color: formValues.color.toLowerCase(),
      })
    );
    // go back to users own page
    navigate(-1);
  };

  // set formValues on change on inputs
  const handleInput = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  /**
   * function validates userinput so that action wont be dispatched with bad data
   * @param  {string} id the id of the input that should be validated
   */
  const validateUserInput = (id) => {
    if (id === 'color') {
      // regex to determine if provided colorcode is indeed a valid colorcode
      if (
        !String(formValues.color)
          .toLowerCase()
          .match(/^#([0-9a-f]{3}){1,2}$/i)
      ) {
        // if provided colorcode is not valid an error will be set
        setColorError('You must enter a valid colorcode');
      } else {
        setColorError('');
      }
    } else if (id === 'description') {
      // checking that user has entered a description
      if (!formValues.description) {
        setDescriptionError('You must enter a description');
      } else {
        setDescriptionError('');
      }
    }
  };

  /**
   * function that makes a final validation of userinput before dispaching action
   * @param  {object} e the eventobject where event occured
   */
  const handleSubmitClick = (e) => {
    e.preventDefault();
    // validates both inputvalues
    validateUserInput('color');
    validateUserInput('description');

    //checks if there is an input error and if values are not empty
    if (
      !colorError &&
      !descriptionError &&
      formValues.color &&
      formValues.description
    ) {
      // determine with action to dispatch
      if (props.mode === 'create') {
        console.log(formValues, 'handlesubmitclick');
        handleNewPost();
      } else if (props.mode === 'edit') {
        handleUpdatePost();
      }

      // where to go after completion
      if (props.url !== '/') {
        navigate('/');
      }
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
