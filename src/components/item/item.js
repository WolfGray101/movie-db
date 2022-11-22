import React from 'react';
import { Rate } from 'antd';
import 'antd/dist/antd.css' ;
import './item.css';
import posterr from './noimage.jpeg'
import { Consumer } from '../../services/service-context';

function Item(props) {

  const {posterPath, changeRate, genresItem, ...itemProps} = props
  
  const genresBlock =  (genresIds) => {
    if (genresItem.length === 0) return 'No genres name'
    const namesGanr = genresItem.map((id) => {
      const resFilter = genresIds.filter(el => el.id === id)
      const resGanreName = resFilter.length > 0 ? resFilter[0].name : (resFilter.name = 'no data')
   
      return <span className = 'genres__el' key={itemProps.id}> {resGanreName} </span>
    })
    return namesGanr
  }
  const _apiBase = 'https://image.tmdb.org/t/p/original/';
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
              (genresIds) => genresBlock(genresIds)
            }
          </Consumer>
        </span>
        <div className='overview'>{itemProps.overview}</div>  
        <div className={`average ${color}`}>{itemProps.voteAverage}</div> 
        <Rate  count={10} allowHalf 
          onChange = {(value) => changeRate(value) }
         
          defaultValue={0} className="rate"/>   
      </div>  
    </div> 
  );
}

export default Item;
