import React, { useEffect, useState } from 'react';
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
    isValid: false,
  });
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (auth.id) navigate('/');
  }, [auth, navigate]);

  const validateUserInput = () => {
    if (
      !String(formValues.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailError('You must enter a valid email');
      setFormValues({ ...formValues, isValid: false });
    } else {
      setEmailError('');
    }

    if (formValues.name.length < 3) {
      setNameError('You must enter a name, min 3 characters');
      setFormValues({ ...formValues, isValid: false });
    } else {
      setNameError('');
    }

    if (formValues.password.length < 6) {
      setPasswordError('Your password must be at least 6 characters');
      setFormValues({ ...formValues, isValid: false });
      return;
    } else {
      setPasswordError('');
    }

    if (nameError || emailError || passwordError) {
      setFormValues({ ...formValues, isValid: false });
    } else {
      setFormValues({ ...formValues, isValid: true });
    }
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUserInput();
    if (formValues.isValid) {
      try {
        dispatch(registerUser(formValues));
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className='flex-centered'>
      <form className='register-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='name'
          id='name'
          onChange={(e) => handleInputChange(e)}
          value={formValues.name}
        />
        <input
          type='text'
          placeholder='email'
          id='email'
          onChange={(e) => handleInputChange(e)}
          value={formValues.email}
        />
        <input
          type='password'
          placeholder='password'
          id='password'
          onChange={(e) => handleInputChange(e)}
          value={formValues.password}
        />
        {nameError && <p className='error-message name-error'>{nameError}</p>}
        {emailError && (
          <p className='error-message email-error'>{emailError}</p>
        )}
        {passwordError && (
          <p className='error-message password-error'>{passwordError}</p>
        )}
        <button>Register</button>
        <p className='switch-authmode'>
          Already a registerd user? <Link to='/auth/login'>Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
