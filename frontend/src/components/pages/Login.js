import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/auth/authSlice';
import '../shared/Form.scss';

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  /**
   * Function that will be envoked when component is mounted
   */
  useEffect(() => {
    // if a user is logged in (log in was successfull) first page will be shown
    if (auth.id) navigate('/');
  }, [auth, navigate]);

  /**
   * Function that is envoked when user clicks button to login
   * @param  {event} e the eventobject
   */
  const handleSubmit = (e) => {
    // prevent default reload
    e.preventDefault();
    try {
      // dispatch action to login user
      dispatch(loginUser(formValues));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='flex-centered'>
      <form className='login-form' onSubmit={handleSubmit}>
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

        {auth.status === 'failed' && (
          <p className='error-message auth-error'>{auth.error.message}</p>
        )}
        <button>Login</button>
        <p className='switch-authmode'>
          Not yet a user? <Link to='/auth/register'>Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
