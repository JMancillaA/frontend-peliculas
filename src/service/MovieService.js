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
export const getMovieDetailsById = (movieId) => {
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      return null;
    });
};
export const getNowPlayingMovies = () => {
  return axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
    .then(response => response.data.results)
    .catch(error => {
      console.error(error);
      return [];
    });
};

export const getTopRatedMovies = () => {
  return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)
    .then(response => response.data.results)
    .catch(error => {
      console.error(error);
      return [];
    });
};
export const getGenreCode = (genreName) => {
  const genreMap = {
    'Action': 28,
    'Adventure': 12,
    'Animation': 16,
    'Comedy': 35,
    'Crime': 80,
    'Documentary': 99,
    'Drama': 18,
    'Family': 10751,
    'Fantasy': 14,
    'History': 36,
    'Horror': 27,
    'Music': 10402,
    'Mystery': 9648,
    'Romance': 10749,
    'Science Fiction': 878,
    'TV Movie': 10770,
    'Thriller': 53,
    'War': 10752,
    'Western': 37
  };

  return genreMap[genreName] || null;
};

export const searchMovies = (genreId, year, ascending) => {
  const genreName = getGenreCode(genreId);
  // Construye la URL de la API según los parámetros proporcionados
  let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
  apiUrl += `&with_genres=${genreName}`;
  apiUrl += `&primary_release_year=${year}`;
  if (!ascending) {
    apiUrl += '&sort_order=desc';
  }

  return axios.get(apiUrl)
    .then(response => response.data.results)
    .catch(error => {
      console.error(error);
      return [];
    });
};