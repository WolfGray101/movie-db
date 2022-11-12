import React, { Component } from 'react';

import Item from '../item'

import './itemList.css';

function ItemList({films}) {

  const elements = films.map((item) => {
    // console.log(item);
    const {id, ...itemProps } = item
    return (
      <Item key ={id}     
        {...itemProps}        
      />
    )
  })
  return (
    <div className="item-list">
      {elements}
    </div>
  );
}

export default ItemList;
