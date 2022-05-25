import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/auth/authSlice';
import '../shared/Form.scss';

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(formValues));
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
          placeholder='email'
          onChange={(e) =>
            setFormValues({
              ...formValues,
              email: e.target.value.toLowerCase(),
            })
          }
          value={formValues.email}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) =>
            setFormValues({
              ...formValues,
              password: e.target.value.toLowerCase(),
            })
          }
          value={formValues.password}
        />
        <button>Login</button>
        <p className='switch-authmode'>
          Not yet a user? <Link to='/auth/register'>Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
