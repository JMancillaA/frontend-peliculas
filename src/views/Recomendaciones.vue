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
<template></template>