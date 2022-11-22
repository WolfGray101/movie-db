import React from 'react';
import { debounce } from 'lodash'
import { Input } from 'antd'
import './search.css';

function Search ({onLabelChange}) { 

  const inputValue = ({target}) => {    
    console.log(target);    
   
    let label = target.value
    if (!label || label === '') label = 'return' 
    onLabelChange(label)
  }

  return (  
    <Input  className="input"
      type='text'
      placeholder="Type to search"
      onChange={debounce(inputValue, 1000)}
    />
  );
}
export default Search
