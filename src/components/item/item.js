import React from 'react';
import { Rate } from 'antd';
import 'antd/dist/antd.css' ;
import './item.css';
import posterr from './noimage.jpeg'
import { Consumer } from '../../services/service-context';

function Item(props) {
  
  const _apiBase = 'https://image.tmdb.org/t/p/original/';
  const {posterPath, changeRate, genresItem, genresBlock, ...itemProps} = props
  
  const   cutText = (text) => {
    let cut = text.slice(0, 80);
    const cutInd = cut.lastIndexOf(' ');
    cut = text.slice(0, cutInd)
    return `${cut} ...`
  }
  
  let color = 'color3'
  const avg = itemProps.voteAverage
  if (avg<3 && avg<=5) color = 'color5';
  if (avg<5 && avg<=7) color = 'color7'
  if (avg<7 ) color = 'color10'
  let poster = `${_apiBase}${posterPath}` 
  if (!posterPath) poster = posterr
  return (
    <div className="item">      
      <img src={poster} alt = 'poster name' />
      
      <div className='item-props'>
       
        <h4>{itemProps.originalTitle}</h4>
          
        <span>{itemProps.releaseDate}</span> 
          
        <span className='genres'> 
          <Consumer>
            {
              (genresIds) => props.genresBlock(genresIds, genresItem)
            }
          </Consumer>
        </span>
        
        <div className='overview'>{ cutText(itemProps.overview) }</div>  
        
        <div className={`average ${color}`}>
          <span>{itemProps.voteAverage}</span>
        </div> 
       
        <Rate  count={10} allowHalf 
          onChange = {(value) => changeRate(value) }         
          defaultValue={0} className="rate"
        />   
      </div>  
    </div> 
  );
}

export default Item;
