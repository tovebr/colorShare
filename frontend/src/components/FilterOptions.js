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

const FilterOptions = ({ handleClick }) => {
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
        onClick={(e) => onClickedColorButton(e.target.value)}
      >
        {color}
      </button>
    );
  });

  /**
   * When a color-search-button is clicked its handled here
   * @param  {String} value the color the user wants to search for
   */
  const onClickedColorButton = (value) => {
    // color is sent to function passed down from parent
    handleClick(value);
    // and clicked button gets an 'active'-class
    setActiveButton(value);
  };

  return (
    <div className='flex-centered'>
      <div className='filter-options'>
        <p>Filter posts by color</p>
        <div className='color-buttons'>
          {renderedOptions}{' '}
          <button
            type='button'
            id='reset'
            onClick={() => onClickedColorButton('')}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
