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

  /**
   * Function that will be envoked when component is mounted
   */
  useEffect(() => {
    // if a user is logged in (log in was successfull) first page will be shown
    if (auth.id) navigate('/');
  }, [auth, navigate]);

  /**
   * Function that validates users input
   */
  const validateUserInput = () => {
    // try if users email is a valid email
    if (
      !String(formValues.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      // if email is not valid emailError will be populated with a message
      setEmailError('You must enter a valid email');
      // and form validity is set to false
      setFormValues({ ...formValues, isValid: false });
    } else {
      // if email is valid emailError will be cleared
      setEmailError('');
    }

    //if users name is shorter than three characters
    if (formValues.name.length < 3) {
      // nameError will be populated with error message
      setNameError('You must enter a name, min 3 characters');
      // and form validity is set to false
      setFormValues({ ...formValues, isValid: false });
    } else {
      // if email is valid emailError will be cleared
      setNameError('');
    }

    //if users password is shorter than six characters
    if (formValues.password.length < 6) {
      // nameError will be populated with error message
      setPasswordError('Your password must be at least 6 characters');
      // and form validity is set to false
      setFormValues({ ...formValues, isValid: false });
      return;
    } else {
      // if email is valid emailError will be cleared
      setPasswordError('');
    }

    // if any of the error-variables is populated with an errormessage
    if (nameError || emailError || passwordError) {
      // form-validity will be set to false
      setFormValues({ ...formValues, isValid: false });
    } else {
      // if not, form-validity will be set to true
      setFormValues({ ...formValues, isValid: true });
    }
  };

  /**
   * Function that updates state of formValues whenever user changes the input
   * @param  {object} e eventobject
   */
  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  /**
   * Function that dispatches registration action
   * @param  {object} e eventobject
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // calls validation-functions to make sure all fields are filled in correctly
    validateUserInput();
    // if formValues are correct
    if (formValues.isValid) {
      try {
        // action to register user on backend will be dispatched
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
