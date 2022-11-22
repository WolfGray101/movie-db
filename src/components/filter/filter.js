import React from 'react';

import  './filter.css'



function Filter (props) { 

  const clazz = props.activeBtn === 'search' ? 'active' : ''
  const clazzz = props.activeBtn === 'rated' ? 'active' : ''

  return (
    <div className='filter-button'>
      <button id = 'search' type="button" className= {`filter-button__button ${clazz}`} 
        onClick={e =>props.onToggle(e)}>Search</button>
      <button  id = 'rated' type="button" className={`filter-button__button ${clazzz}`} 
        onClick={e => props.onToggle(e)}>Rated</button>
    </div>
  )
  
}

export default Filter;
