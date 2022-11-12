import React, { Component } from 'react';

import Filter from '../filter'
import Search from '../search'

import './header.css';



export default class Header extends Component {
  
  render () {
  return (
    <div className="header">
      <Filter />
      <Search />
    </div>
  );
}
}

