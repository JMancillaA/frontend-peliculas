// MovieService.js
import axios from 'axios';

const apiKey = '015aa42cba45f4e653c7710c3791f6e0';

export const getPopularMovies = () => {
  return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
    .then(response => response.data.results)
    .catch(error => {
      console.error(error);
      return [];
    });
};
