import React from 'react';
import './Backdrop.scss';

const Backdrop = ({ onCancel }) => {
  return <div onClick={onCancel} className='backdrop'></div>;
};

export default Backdrop;
