<script setup>
import { onMounted, ref, computed } from 'vue';
import { getNowPlayingMovies } from '@/service/MovieService';

const movies = ref([]);

onMounted(async () => {
  try {
    const Movies = await getNowPlayingMovies();
    movies.value = Movies;
    genres.value = [...new Set(Movies.flatMap(movie => movie.genre_ids))];
    years.value = [...new Set(Movies.map(movie => movie.release_date.split('-')[0]))];
  } catch (error) {
    console.error('Error al obtener las películas', error);
  }
});

const groupedMovies = computed(() => {
  const groupSize = 1;
  const groups = [];
  for (let i = 0; i < movies.value.length; i += groupSize) {
    groups.push(movies.value.slice(i, i + groupSize));
  }
  return groups;
});

const formatMovieDetails = (releaseDate, voteAverage) => {
  const year = releaseDate.split('-')[0];
  return `Año: ${year}, Puntuación: ${voteAverage}`;
};
const genres = ref([]); // Para almacenar los géneros disponibles
const years = ref([]);  // Para almacenar los años disponibles
const selectedGenre = ref(''); // Para el género seleccionado
const selectedYear = ref('');   // Para el año seleccionado
const sortAscending = ref(true); // Para controlar el orden ascendente/descendente
const getGenreName = (genreId) => {
  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
};

  return genreMap[genreId] || 'Desconocido';
};
</script>
<template>
    <div>
      <h1 class="card-header">WILL SEE</h1>
      <h2>Now Playing</h2>
      <div class="filters">
        <label for="genreSelect">Selecciona un Género:</label>
        <select id="genreSelect" v-model="selectedGenre">
          <option value="">Todos los Géneros</option>
          <option v-for="genreId in genres" :key="genreId" :value="genreId">{{ getGenreName(genreId) }}</option>
        </select>
  
        <label for="yearSelect">Selecciona un Año:</label>
        <select id="yearSelect" v-model="selectedYear">
          <option value="">Todos los Años</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
  
        <label for="sortSelect">Ordenar por Puntuación:</label>
        <select id="sortSelect" v-model="sortAscending">
          <option value="true">Ascendente</option>
          <option value="false">Descendente</option>
        </select>
      </div>
  
      <div class="movie-grid">
        <div v-for="(group, index) in groupedMovies" :key="index" class="movie-group">
          <ul class="movie-list">
            <li v-for="movie in group" :key="movie.id" class="movie-item">
              <!-- Agregamos el evento de clic para redirigir a la página de detalles -->
              <router-link :to="{ name: 'peli', params: { id: movie.id } }">
                <img :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path" :alt="movie.title" class="movie-image" />
              </router-link>
              <div class="movie-details">
                <!-- También agregamos el evento de clic al título -->
                <router-link :to="{ name: 'peli', params: { id: movie.id } }">
                  <h3>{{ movie.title }}</h3>
                </router-link>
                <p>{{ formatMovieDetails(movie.release_date, movie.vote_average) }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  
  <style>
  .movie-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .movie-group {
    width: calc(25% - 20px);
    margin-right: 20px;
    margin-bottom: 20px;
    flex-grow: 1;
    min-width: 200px;
  }
  
  .movie-list {
    list-style: none;
  }
  
  .movie-item {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .movie-image {
    max-width: 100%;
    height: auto;
  }
  
  .movie-details {
    text-align: left;
  }
  </style>
  