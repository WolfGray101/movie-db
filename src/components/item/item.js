import React from 'react';
import { Rate } from 'antd';
import 'antd/dist/antd.css' 
import './item.css';

function Item(props) {

  const {posterPath, ...itemProps} = props
  const _apiBase = 'https://image.tmdb.org/t/p/original/';

  return (
        <div className="item">      
          <img src={`${_apiBase}${posterPath}`} alt = 'poster name'></img>
          <div className='item-props'>
          <h4>{itemProps.originalTitle}</h4>
          <span>{itemProps.releaseDate}</span> 
          <div className='overview'>{itemProps.overview}</div>  
          <div className='average'>{itemProps.voteAverage}</div> 
          <Rate size="small" disabled count={10} allowHalf={true} defaultValue={itemProps.voteAverage} className="rate"/>   
          </div>  
      </div> 
  );
}

export default Item;
