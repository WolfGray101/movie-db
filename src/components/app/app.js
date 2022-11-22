import React, { Component } from 'react';
import { Pagination, Alert, Spin } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import Filter from '../filter'
import Search from '../search'
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
    genresIds: [],
    activeBtn: 'search'
  }

  componentDidMount() {
    this.onFilmList()
    this.onSessionCreate()
    this.onGetGenres()
  }

  componentDidUpdate(_, prevState) {
    const { query, currentPage } = this.state
    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      this.onFilmList()
    }
  }

  onSessionCreate = () => {
    this.serviceFile
      .getSessinID()
      .then(idKey => localStorage.setItem('sessionId', idKey))
      .catch(this.onError)  
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

  onGetRatedMoves = () => {
    const idKey = localStorage.getItem('sessionId')
    this.serviceFile
      .getRatedMoves(idKey)
      .then(this.onFilmListItem)
      .catch(this.onError)
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
      currentPage:1,
      loading: true
    })
  }

  onPageChange = (page) => {
    this.setState({ 
      currentPage: page, 
      loading:true })
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


  onToggle = (e) => {
    const active  = e.target.id
    if ( active === 'search') {
      this.onFilmList()
      this.setState({
        query:'return'
      })      
    }
    if ( active === 'rated') {
      this.onGetRatedMoves()
    }
    this.setState({
      activeBtn:active
    })
  }

  genresBlock =  (genresIds,genresItem ) => {
    if (genresItem.length === 0) return 'No genres name'
    const namesGanr = genresItem.map((id) => {
      const resFilter = genresIds.filter(el => el.id === id)
      const resGanreName = resFilter.length > 0 ? 
        resFilter[0].name : (resFilter.name = 'no data')
   
      return <span className = 'genres__el' key={id}> {resGanreName} </span>
    })
    return namesGanr
  }

  render() {
    const {films, loading, error, totalPages, currentPage, 
      genresIds, activeBtn} = this.state
    
    const hasData = !(loading || error)
    const spinner = loading ?  <SpinnerMessage/>  : null;
    const errorMessage = error?  <ErrorMessage />:null;
    const search = activeBtn !== 'rated' ? <Search       
      onLabelChange = {(value) => this.onLabelChange(value)} 
    />:null  
    const content = hasData ? <ContentView  
      films = {films}
      activeBtn = {activeBtn}
      genresIds = {genresIds}
      changeRate = {this.changeRate}
      currentPage= {currentPage}
      totalPages = {totalPages} 
      onPageChange= {this.onPageChange} 
      genresBlock = {this.genresBlock}
    /> : null;
    
    return (
    
      <div className="container">
        <Online>
          <Filter 
            activeBtn= {this.state.activeBtn}
            onToggle = {this.onToggle}/>
          {search} 
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
        message="Wait a few momements"
        description="Loading in progress"
        type="info"
      />
    </Spin> 
  )
}

function ContentView({ 
  films, currentPage,
  changeRate, onPageChange,
  totalPages, genresIds, genresBlock  }) {

  const emptySearch = films.length===0? 
    <Alert
      message="Not found"   description="Check your request"
      type="info" />  
    :null
 
  return (
    <>
     
      {emptySearch}     

      <Provider value= {genresIds}>
        <ItemList  
          films = {films}
          changeRate = {changeRate}
          genresBlock={genresBlock}
        />
      </Provider>

      <Pagination size="default" 
        current={currentPage} 
        total={totalPages}  
        showSizeChanger= {false}
        defaultPageSize={[20]}  
        pageSizeOptions ={[20]} 
        onChange={onPageChange} 
        className='pagination'
      />
    </>
  );
}




