
// `https://api.themoviedb.org/3/list/${listId}?api_key=${TMDB_API_KEY}&language=fr-FR`

const fetchAPI = {
  API_KEY : process.env.REACT_APP_TMDB_KEY,
  API_PREFIX : 'https://api.themoviedb.org/3',
  /**
   * Function to call the TMDB API  to get a list of 5 top films whith searchQuery
   * @param {searchQuery} String : query from user
   * @param {API_KEY} String : user key for API
   * @returns {Array} Movie objects
   */
  async fetchTop5Results(searchQuery){
    const res = await fetch(`${this.API_PREFIX}/search/movie?api_key=${this.API_KEY}&language=fr-FR&include_adult=false&query=${searchQuery}`);
    const { results } = await res.json();
    return results;
  },


};

module.exports = fetchAPI;