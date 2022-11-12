import React from 'react';

import  './filter.css'

function Filter() { 
  return (
    <div className='filter-button'>
      <button className='filter-button__button active'>Search</button>
      <button className='filter-button__button'>Rated</button>
    </div>
  );
}

export default Filter;
