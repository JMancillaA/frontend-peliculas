<template>
  <div>
    <h1 class="card-header">WILL SEE</h1>
    <p v-if="error">Si estás viendo este mensaje, estás loggeado.</p>
    <h2>Películas Populares</h2>
    <div class="movie-grid">
      <div v-for="(group, index) in groupedMovies" :key="index" class="movie-group">
        <ul class="movie-list">
          <li v-for="movie in group" :key="movie.id" class="movie-item">
            <img :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path" :alt="movie.title" class="movie-image" />
            <div class="movie-details">
              <h3>{{ movie.title }}</h3>
              <p>{{ formatMovieDetails(movie.release_date, movie.vote_average) }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
  /* Estilos CSS aquí */
</style>

<script>
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ref, onMounted, computed } from 'vue';
import { getPopularMovies } from '../service/MovieService';

export default {
  data() {
    return {
      movies: [],
      error: false,
    };
  },
  created() {
    this.userId = this.$route.query.id;
  },
  methods: {
    // Otras funciones personalizadas si es necesario
  },
  setup() {
    const movies = ref([]);
    
    onMounted(async () => {
      try {
        const popularMovies = await getPopularMovies();
        movies.value = popularMovies;
      } catch (error) {
        console.error('Error al obtener las películas populares', error);
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

    return {
      groupedMovies,
      formatMovieDetails,
    };
  },
  mounted() {
    if (localStorage.getItem('nombre')) {
      this.error = true;
    } else {
      this.$router.push("/login");
    }
  },
};
</script>
