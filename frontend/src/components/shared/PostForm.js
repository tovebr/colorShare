import React, { useState } from 'react';

const PostForm = (props) => {
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    color: '',
  });

  return (
    <div>
      <form>
        <input
          type='text'
          id='title'
          placeholder='title'
          onChange={(e) =>
            setFormValues({ ...formValues, title: e.target.value })
          }
        />
        <input
          type='text'
          id='description'
          placeholder='description'
          onChange={(e) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
        />
        <input
          type='text'
          id='color'
          placeholder='color'
          onChange={(e) =>
            setFormValues({ ...formValues, color: e.target.value })
          }
        />
        <p>The color must be written as a hex-code, ex #676767</p>
        <button>{props.buttontext}</button>
      </form>
    </div>
  );
};

export default PostForm;
