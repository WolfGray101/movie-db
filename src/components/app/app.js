import React, { Component } from 'react';
import { Pagination } from 'antd';
import Header from '../header'
import ItemList from '../itemList'
import Spinner from '../spinner'
import ErrorIndicator from '../error'


import 'antd/dist/antd.css'
import ServiceFile from  '../../services/service-file'

import './app.css';

export default class  App extends Component {

 serviceFile = new ServiceFile()

state = {
  films: [],
  loading:true,
  error:false,
  currentPage:1
}
constructor() {
  super();
  this.getFilmsList() 
}
getFilmsList(currentPage) {
  this.serviceFile
  .getAllFilms(currentPage)
  .then(this.onPlanetLoaded)
  .catch(this.onError);
}

onPlanetLoaded = (filmList) => {
  this.setState({ 
    films: filmList, 
    loading: false, 
    error: false 
  });
};
 onChange = (pageNumber) => {
  this.setState( {
    currentPage:pageNumber
  })
  this.getFilmsList(pageNumber) 
 }
 onError = (err) => {
    this.setState({
      error: true,
      loading:false
    })
  }
render() {
  const {films, loading, error} = this.state
    const hasData = !(loading || error)
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ContentView  
    films = {films}
    onChange= {this.onChange}
    /> : null;
    const errorMessage = error? <ErrorIndicator /> :null
  return (
    <div className="container">
        {errorMessage}     
        {spinner}
        {content}
    </div>
  );
}
}

const ContentView = ({ films, onChange }) => {

  return (
    <React.Fragment>
       <Header />
       <ItemList  films = {films}/>
       <Pagination size="small" total={50}  onChange={onChange} className='pagination'/>
    </React.Fragment>
  );
};




