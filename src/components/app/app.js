import React, { Component } from 'react';
import { Pagination, Alert, Spin } from 'antd';
import { Offline, Online } from 'react-detect-offline';
import Header from '../header'
import ItemList from '../itemList'
import ServiceFile from  '../../services/service-file'
import { Provider } from '../../services/service-context';

import './app.css';
import 'antd/dist/antd.css'

export default class  App extends Component {

  serviceFile = new ServiceFile()

  state = {
    films: [],
    loading:true,
    error:false,
    totalPages:null,
    query:'return',
    currentPage:1,
    genresIds: []
  }

  componentDidMount() {
    this.onFilmList()
    this.onSessionCreate()
    this.onGetGenres()
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, currentPage } = this.state
    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      this.onFilmList()
    }
  }

  onGetGenres = () => {
    this.serviceFile
      .getGenres()
      .then((responce)  => {
        this.setState({
          genresIds: responce.genres
        })
      })
      .catch(this.onError)  
  }

  onSessionCreate = () => {
    this.serviceFile
      .getSessinID()
      .then(idKey => localStorage.setItem('sessionId', idKey))
      .catch(this.onError)  
  }

  onGetRatedMoves = () => {
    const idKey = localStorage.getItem('sessionId')
    this.serviceFile
      .getRatedMoves(idKey)
      .then(this.onFilmListItem)
  }

  onFilmList = () => {
    const { query, currentPage } = this.state
    this.serviceFile
      .getFilmList(currentPage, query)
      .then(this.onFilmListItem)
      .catch(this.onError)
  }

  onFilmListItem = (responce)  => {
    const films = responce.results.map(this.serviceFile._transformFilm)  
    this.setState({ 
      films, 
      loading: false, 
      error: false,
      totalPages:responce.totalResults
    });
  }

  onLabelChange = (value) => {
    this.setState({
      query: value,
      currentPage:1
    })
  }

  onPageChange = (page) => {
    this.setState({ currentPage: page })
  }
 
  onError = (error) => {
    this.setState({
      error: true,
      loading:false
    })
    console.log(error);
  }

  changeRate = (value, id) => {
    const sessionId = localStorage.getItem('sessionId')
    this.serviceFile
      .setRateMovie(value, id, sessionId)
  }

  render() {
    const {films, loading, error, totalPages, currentPage, genresIds} = this.state
    
    const hasData = !(loading || error)
    const spinner = loading ?  <SpinnerMessage/>  : null;
    const errorMessage = error?  <ErrorMessage />:null;
    const content = hasData ? <ContentView  
      films = {films}
      genresIds = {genresIds}
      getSearch = {this.onFilmList}
      getRated = {this.onGetRatedMoves}
      changeRate = {this.changeRate}
      currentPage= {currentPage}
      totalPages = {totalPages} 
      onPageChange= {this.onPageChange} 
      onLabelChange = {this.onLabelChange}  /> : null;
    return (
    
      <div className="container">
        <Online>
          {errorMessage}     
          {spinner}
          {content}
        </Online>
        <Offline>
          <Alert
            message="Error"
            description="This is an error message about Network problem."
            type="error" showIcon
          />
        </Offline>
      </div>
    );
  }
}


function ErrorMessage() {
  return (
    <Alert
      message="Error"
      description="Something went wrong."
      type="error"
      showIcon
    />
  )
}

function SpinnerMessage() {
  return (
    <Spin tip="Loading..."> 
      <Alert
        message="Wait a few 123 momements"
        description="Loading in progress"
        type="info"
      />
    </Spin> 
  )
}

function ContentView({ films, currentPage,
  changeRate, onPageChange, onLabelChange, 
  totalPages, getRated, getSearch, genresIds }) {
  const emptySearch = films.length===0? <Alert
    message="Not found"   description="Check your request"
    type="info" />  :null
  return (
    <>
      <Header 
        getSearch= {getSearch}
        getRated = {getRated}
        onLabelChange = {onLabelChange}/>
      {emptySearch}
        
      <Provider value= {genresIds}>
        <ItemList  
          films = {films}
          changeRate = {changeRate}/>
      </Provider>
       
      <Pagination size="default" 
        current={currentPage} 
        total={totalPages}  
        showSizeChanger= {false}
        defaultPageSize={[20]}  
        pageSizeOptions ={[20]} 
        onChange={onPageChange} 
        className='pagination'/>
    </>
  );
}




