import React from 'react';
import { Link } from 'react-router-dom';

const AuthorHeader = ({ user }) => {
  /* Function that formats titles and makes the first letter in a word uppercased */
  const casedName = (string) => {
    let casedString = '';

    /* If-statment determins wether the title has one word or more */
    if (string.includes(' ')) {
      string.split(' ').forEach((word) => {
        casedString += word.slice(0, 1).toUpperCase() + word.slice(1) + ' ';
      });
    } else {
      casedString = string.slice(0, 1).toUpperCase() + string.slice(1);
    }
    return casedString;
  };

  return (
    <Link to={`/users/${user.id}`} className='post-author'>
      {casedName(user.name)}
    </Link>
  );
};

export default AuthorHeader;
