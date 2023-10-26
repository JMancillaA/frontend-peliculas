<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <br>
          <h5 class="card-header">Etiquetas</h5>
          <div class="card-body">
            <button @click="iratareas" class="btn btn-success mb-3">Tareas</button>
            <button @click="crearEtiqueta" class="btn btn-success mb-3">Crear Etiqueta</button>

            <table class="table">
              <thead>
                <tr>
                  <th>Etiqueta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(etiqueta, index) in etiquetas" :key="etiqueta.id">
                  <td>
                    <input v-model="etiqueta.nombreEtiqueta"/>
                  </td>
                  <td>
                    <button @click="eliminarEtiqueta(etiqueta.id)" class="btn btn-danger">Eliminar</button>
                  </td>
                  <td>
                    <button @click="editarEtiqueta(etiqueta.id,etiqueta.nombreEtiqueta)" class="btn btn-primary">Guardar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import EtiquetasService from '../service/EtiquetasService';
import { ref, onMounted } from 'vue';

export default {
  data() {
    return {
      etiquetas: [],
    };
  },
  methods: {
    async fetchEtiquetas() {
      try {
        const userId = this.$route.params.id;
        const etiquetaService = new EtiquetasService();
        const response = await etiquetaService.obtenerEtiquetasPorUsuario(userId);

        if (Array.isArray(response)) {
          this.etiquetas = response;
        } else {
          console.error('El formato de las etiquetas no es válido:', response);
        }
      } catch (error) {
        console.error('Error al obtener las etiquetas:', error);
      }
    },
    async eliminarEtiqueta(etiquetaId) {
      try {
        const result = await Swal.fire({
          title: '¿Estás seguro?',
          text: 'Esta acción eliminará la etiqueta permanentemente, recuerde que no puede eliminar una etiqueta usada.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
          // Llama al servicio para eliminar la etiqueta
          const etiquetaService = new EtiquetasService();
          const eliminada = await etiquetaService.eliminarEtiquetaPorId(etiquetaId);
        }
      } catch (error) {
        console.error('Error al eliminar la etiqueta:', error);
      }
    },
    async crearEtiqueta() {
      try {
        const userId = this.$route.params.id;
        const etiquetaService = new EtiquetasService();
        const nuevaEtiqueta = await etiquetaService.crearEtiqueta(userId);
        this.etiquetas.push(nuevaEtiqueta);
      } catch (error) {
        console.error('Error al crear la etiqueta:', error);
      }
    },
    async editarEtiqueta(etiquetaId, nuevoNombre) {
      try {
        const etiquetaService = new EtiquetasService();
        const etiquetaEditada = await etiquetaService.editarEtiqueta(etiquetaId, nuevoNombre);

        // Actualiza la etiqueta editada en la lista de etiquetas
        const index = this.etiquetas.findIndex(etiqueta => etiqueta.id === etiquetaId);
        if (index !== -1) {
          this.etiquetas[index] = etiquetaEditada;
        }
      } catch (error) {
        console.error('Error al editar la etiqueta:', error);
      }
    },

    iratareas() {
      const userId = this.$route.params.id; // Obtener userId desde la ruta actual
      this.$router.push({ name: 'listadetareas', params: { id: userId } });
    },
  },
  created() {
    this.fetchEtiquetas();
  },
};
</script>
