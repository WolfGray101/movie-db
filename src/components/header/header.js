import React from 'react';

import Filter from '../filter'
import Search from '../search'

import './header.css';



function  Header ({onLabelChange, getRated, getSearch}) { 
  return (      
    <div className="header">
      <Filter getRated = {getRated}
        getSearch = {getSearch}/>
      <Search onLabelChange = {(value) => onLabelChange(value)} />
    </div>
  );
} 

export default Header