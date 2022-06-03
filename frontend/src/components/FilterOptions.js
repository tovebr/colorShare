import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts, searchPosts } from '../features/posts/postsSlice';
import './FilterOptions.scss';

const colorOptions = [
  'purple',
  'red',
  'green',
  'yellow',
  'white',
  'pink',
  'blue',
  'brown',
  'orange',
];

const FilterOptions = ({ handleClick, url, activeButton }) => {
  // render all buttons the user can click to search database
  const renderedOptions = colorOptions.map((color) => {
    return (
      <button
        type='button'
        value={color}
        key={color}
        id={color}
        className={activeButton === color && url !== '/' ? 'active' : ''}
        onClick={(e) => handleClick(e.target.value)}
      >
        {color}
      </button>
    );
  });

  return (
    <div className='flex-centered'>
      <div className='filter-options'>
        <p>Filter posts by color</p>
        <div className='color-buttons'>
          {renderedOptions}{' '}
          <button type='button' id='reset' onClick={() => handleClick('')}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
