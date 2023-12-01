<template>
    <div v-if="movie" class="movie-container">
      <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" class="movie-image" />
      <div class="movie-details">
        <h1 class="card-header">{{ movie.title }}</h1>
        <p><strong>Año de lanzamiento:</strong> {{ movie.release_date }}</p>
        <p><strong>Géneros:</strong> {{ getGenresString(movie.genres) }}</p>
        <p><strong>Puntuación:</strong> {{ movie.vote_average }}</p>
        <p><strong>Sinopsis:</strong> {{ movie.overview }}</p>
  
        <!-- Detalles adicionales -->
        <div class="additional-details">
          <p><strong>Duración:</strong> {{ movie.runtime }} minutos</p>
          <p><strong>Idiomas:</strong> {{ getLanguagesString(movie.spoken_languages) }}</p>
          <p><strong>Presupuesto:</strong> ${{ movie.budget.toLocaleString() }}</p>
          <p><strong>Ingresos:</strong> ${{ movie.revenue.toLocaleString() }}</p>
          <p><strong>Fecha de lanzamiento:</strong> {{ movie.release_date }}</p>
          <p><strong>Compañías de producción:</strong> {{ getProductionCompaniesString(movie.production_companies) }}</p>
          <h5>RadioButton</h5>
                <div class="grid">
                    <div class="col-12 md:col-4">
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="option1" name="option" value="1" v-model="radioValue" />
                            <label for="option1">Sin ver</label>
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="option2" name="option" value="2" v-model="radioValue" />
                            <label for="option2">Por ver</label>
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="option3" name="option" value="3" v-model="radioValue" />
                            <label for="option3">Vista</label>
                        </div>
                    </div>
                    <div v-if="radioValue === '3'">
                      <Rating v-model="ratingValue" />
                    </div>
                    <div v-if="radioValue === '3'||radioValue === '2'">
                      <Button label="Guardar" class="mr-2 mb-2"></Button>
                    </div>
                </div>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- Puedes agregar un mensaje de carga o manejar el estado de carga como prefieras -->
      Cargando detalles de la película...
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getMovieDetailsById } from '@/service/MovieService';
  
  // Utiliza `defineProps` para acceder a los props
  const props = defineProps(['id']);
  const radioValue = ref('1');
  const ratingValue = ref(null);
  const movie = ref(null);
  
  onMounted(async () => {
    try {
      // Obtenemos el ID de la película desde los parámetros de la ruta usando `props`
      const movieId = props.id;
      // Llamamos a la función para obtener los detalles de la película
      movie.value = await getMovieDetailsById(movieId);
    } catch (error) {
      console.error('Error al obtener los detalles de la película', error);
    }
  });
  
  const getGenresString = (genres) => {
    return genres.map(genre => genre.name).join(', ');
  };
  
  const getLanguagesString = (languages) => {
    return languages.map(lang => lang.name).join(', ');
  };
  
  const getProductionCompaniesString = (companies) => {
    return companies.map(company => company.name).join(', ');
  };
  </script>
  
  <style>
  /* Agrega tus estilos según sea necesario */
  .movie-container {
    display: flex;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .movie-image {
    max-width: 100%;
    height: auto;
  }
  
  .movie-details {
    margin-left: 20px;
  }
  
  .additional-details {
    margin-top: 20px;
  }
  </style>
  