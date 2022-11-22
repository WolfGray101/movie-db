import React, { Component } from 'react';

import  './filter.css'



class Filter extends Component { 
  constructor (props) {
    super()
    this.props = props
    this.state = {
      activeBtn: '',
    }
  }


  onToggle = (e) => {
    const active  = e.target.id
    if ( active === 'search') {
      this.props.getSearch()      
    }
    if ( active === 'rated') {
      this.props.getRated()
    }
    this.setState({
      activeBtn:active
    })
  }

  render() {
    const isActive = this.state.activeBtn
    const clazz = isActive === 'search' ? 'active' : ''
    const clazzz = isActive === 'rated' ? 'active' : ''

    return (
      <div className='filter-button'>
        <button id = 'search' type="button" className= {`filter-button__button ${clazz}`} 
          onClick={e => this.onToggle(e)}>Search</button>
        <button  id = 'rated' type="button" className={`filter-button__button ${clazzz}`} 
          onClick={e => this.onToggle(e)}>Rated</button>
      </div>
    )
  }
}

export default Filter;
