import React from 'react';
import { Link } from 'react-router-dom';

const AuthorHeader = ({ user }) => {
  /**
   * Function that returns users name with first letter caped
   * @param  {String} string users name from database
   * @return {String} users name with caps
   */
  const casedName = (string) => {
    let casedString = '';

    //If-statment determins wether the name has one word or more
    if (string.includes(' ')) {
      // splits it on blankspace and than splits every word on the first letter,
      // first letter is caped and then reunited with the other part of the name
      string.split(' ').forEach((word) => {
        casedString += word.slice(0, 1).toUpperCase() + word.slice(1) + ' ';
      });
    } else {
      casedString = string.slice(0, 1).toUpperCase() + string.slice(1);
    }
    return casedString;
  };

  return (
    <div className='post-author'>
      Author:
      <Link to={`/users/${user.id}`}> {casedName(user.name)}</Link>
    </div>
  );
};

export default AuthorHeader;
