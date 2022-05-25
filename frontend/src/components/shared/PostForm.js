import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* import { createPost } from '../../features/posts/postsSlice'; */

const PostForm = (props) => {
  const auth = useSelector((state) => state.auth);
  const postStatus = useSelector((state) => state.posts.status);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    description: '',
    color: '',
  });

  const handlePostClick = (e) => {
    e.preventDefault();
    if (formValues.color && formValues.description) {
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
    }
  };

  return (
    <div className='flex-centered'>
      <form className='postform' onSubmit={(e) => handlePostClick(e)}>
        <div className='text-inputs'>
          <input
            type='text'
            id='color'
            placeholder='color'
            value={formValues.color}
            onChange={(e) =>
              setFormValues({ ...formValues, color: e.target.value })
            }
          />
          <p className='postform-info'>
            The color must be written as a hex-code, ex #676767
          </p>
        </div>
        <textarea
          rows='5'
          id='description'
          placeholder='description'
          value={formValues.description}
          onChange={(e) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
        />
        <div className='button-div'></div>
        <button onClick={(e) => handlePostClick(e)}>{props.buttontext}</button>
      </form>
    </div>
  );
};

export default PostForm;
