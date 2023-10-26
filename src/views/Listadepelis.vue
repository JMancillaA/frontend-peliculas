<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h1 class="card-header">WILL SEE</h1>
            <h5>Género:
              <select class="swal2-select" placeholder="Seleccione un país">
                <option></option>
              </select>
            </h5>
            <div class="popular-movies">
              <div v-for="movie in popularMovies" :key="movie.id">
                <img :src="'https://image.tmdb.org/t/p/w200/' + movie.poster_path" alt="Movie Poster">
                <h3>{{ movie.title }}</h3>
                <p>Año: {{ movie.release_date.slice(0, 4) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ref, onMounted } from 'vue';
import { getPopularMovies } from '../service/MovieService';

export default {
  data() {
    return {
      popularMovies: [],
    };
  },
  created() {
    this.userId = this.$route.query.id;
  },
  methods: {
    
  },
  onMounted() {
    getPopularMovies()
      .then((movies) => {
        console.log('Películas populares:', movies);
        this.popularMovies = movies;
      });
  },
};
</script>
