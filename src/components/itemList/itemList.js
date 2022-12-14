import React from 'react';

import Item from '../item'


import './itemList.css';

function ItemList({films, changeRate, genresBlock}) {
  const elements = films.map((item) => {
    const {id, ...itemProps } = item
    
    return (      
      <Item key ={id} 
        genresBlock = {genresBlock}
        changeRate= {(value) => changeRate(value, id)}      
        // eslint-disable-next-line react/jsx-props-no-spreading
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
