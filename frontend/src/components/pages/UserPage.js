import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users.users);
  const user = users.find((user) => user._id === id);

  return (
    <div className='user-card'>
      <h3>{user.name}</h3>
    </div>
  );
};

export default UserPage;
