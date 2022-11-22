export default class SwapiService {
  _apiBase = 'https://api.themoviedb.org/3/';

  _apiKey = '93cd5c933d83522a78de044bddb90b12'
  

  async getResource(url) {

    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(
        `Could not fetch, received ${res.status}`
      ); 
    }
    
    const result = await res.json();
    return result
  }   
  
  async postResource(url, metod, value) {
    const result = await fetch(`${this._apiBase}${url}`, {
      method: metod,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({value}),
    })
    if (!result.ok) {
      throw new Error(`${result.status}`)
    }
  } 

  getGenres = async () => {
    const responce = await this.getResource(`genre/movie/list?api_key=${this._apiKey}&language=en-US`);
    return responce
  }
 
  getFilmList = async(pageNum = 1, query = 'return') => {
    const resGetFilmList =   await this.getResource(`search/movie?api_key=${this._apiKey}&query=${query}&page=${pageNum}`);   
    return this._transformResult(resGetFilmList)
  }

  getSessinID = async () => {
    const sessionID =   await this.getResource(`authentication/guest_session/new?api_key=${this._apiKey}`);   
    return sessionID.guest_session_id
  }

  getRatedMoves = async (idKey) => {
    const resGetFilmList =   await this.getResource(`guest_session/${idKey}/rated/movies?api_key=${this._apiKey}`);
    return this._transformResult(resGetFilmList)
  }

  setRateMovie  = async (value, id, sessionId) => {
    await this.postResource(
      `movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${sessionId}`,
      'POST',
      value
    )
  }
  
  _transformResult(result) {
    return {
      page: result.page,
      results: result.results,
      totalPages: result.total_pages,
      totalResults: result.total_results,
    }
  }

  _transformFilm(film) {
    return {
      id:film.id,
      posterPath: film.poster_path,
      overview: film.overview,
      originalTitle: film.original_title,
      voteAverage: +film.vote_average.toFixed(1),
      releaseDate: film.release_date,
      genresItem: film.genre_ids
    };
  }

  cutText = (text) => {
    let cut = text.slice(0, 100);
    const cutInd = cut.lastIndexOf(' ');
    cut = text.slice(0, cutInd)
    return `${cut} ...`
  }
  
}

// RateStars.propTypes = {
//   idMovie: PropTypes.number.isRequired,
// }
