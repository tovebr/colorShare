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

const FilterOptions = ({ handleClick /* , url, activeButton */ }) => {
  const [activeButton, setActiveButton] = useState('');
  // render all buttons the user can click to search database
  const renderedOptions = colorOptions.map((color) => {
    return (
      <button
        type='button'
        value={color}
        key={color}
        id={color}
        className={activeButton === color ? 'active' : ''}
        onClick={(e) => handleColorClick(e.target.value)}
      >
        {color}
      </button>
    );
  });

  //when color/search-button is clicked
  const handleColorClick = (color) => {
    // that button will get an 'active'-class
    setActiveButton(color);
    // and search will be dispatched in function passed down from parent
    handleClick(color);
  };

  return (
    <div className='flex-centered'>
      <div className='filter-options'>
        <p>Filter posts by color</p>
        <div className='color-buttons'>
          {renderedOptions}{' '}
          <button type='button' id='reset' onClick={() => handleColorClick('')}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
