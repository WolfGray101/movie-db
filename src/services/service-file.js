export default class SwapiService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie';
  _apiKey = '93cd5c933d83522a78de044bddb90b12'

  async getResource(pageNum, query = 'return') {
    const res = await fetch(`${this._apiBase}?api_key=${this._apiKey}&query=${query}&page=${pageNum}`);
console.log(res);
    if (!res.ok) {
      throw new Error(
        `Could not fetch` + 
          `, received ${res.status}`
      ); 
    }
    const resApi = await res.json();
console.log(resApi);    
return resApi;
  }

  async getFilm(id) {
    const res = await this.getResource();
    return res.results.map();
  }
  async getAllFilms(pageNum) {
    const res = await this.getResource(pageNum);        
    return res.results.map(this._transformFilm);
  }
  async getResponceInfo(pageNum){
    const res = await this.getResource(pageNum);
    return res.total_results;
  }
 
  _transformFilm(film) {
    return {
      id:film.id,
      posterPath: film.poster_path,
      overview: film.overview,
      originalTitle: film.original_title,
      voteAverage: film.vote_average,
      releaseDate: film.release_date,

    };
  }

}
