import React from 'react';
import './Backdrop.scss';

/**
 * Funtion that returns a backdrop for modal
 * @param  {function} {onCancel} tells component what to do when clicked
 */
const Backdrop = ({ onCancel }) => {
  return <div onClick={onCancel} className='backdrop'></div>;
};

export default Backdrop;
