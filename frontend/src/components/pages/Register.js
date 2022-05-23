import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/auth/authSlice';

import '../shared/Form.scss';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(registerUser(formValues));
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='flex-centered'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='name'
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
          value={formValues.name}
        />
        <input
          type='text'
          placeholder='email'
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          value={formValues.email}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
          value={formValues.password}
        />
        <button>Register</button>
        <p className='switch-authmode'>
          Already a registerd user? <Link to='/auth/login'>Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
