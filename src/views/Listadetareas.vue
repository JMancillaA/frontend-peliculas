<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <br>
          <h5 class="card-header">Tareas</h5>
          <div class="card-body">
            <button @click="etiquetas" class="btn btn-info mb-3">Etiquetas</button>
            <!-- Botón para crear una tarea -->
            <button @click="crearTarea" class="btn btn-success mb-3">Crear Tarea</button>
            <table class="table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Fecha Límite</th>
                  <th>Estado</th>
                  <th>Fecha Completado</th>
                  <th>Etiqueta</th>
                  <th>Acciones</th> <!-- Columna para el botón -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="tarea in tareas" :key="tarea.id">
                  <td>{{ tarea.titulo }}</td>
                  <td>{{ formatDate(tarea.fechaLimite) }}</td>
                  <td>{{ tarea.estado ? 'Completada' : 'Pendiente' }}</td>
                  <td v-if="tarea.estado === 'Completada'">{{ formatDate(tarea.fechaCompletado) }}</td>
                  <td v-else>-</td>
                  <td>{{ tarea.etiqueta.nombreEtiqueta }}</td>
                  <td>
                    <button @click="cambiarEstado(tarea)" class="btn btn-primary">
                      {{ tarea.estado ? 'Marcar Pendiente' : 'Marcar Completada' }}
                    </button>
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
import TareasService from '../service/TareasService';
import EtiquetasService from '../service/EtiquetasService';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { ref, onMounted } from 'vue';

export default {
  data() {
    return {
      tareas: [],
      etiquetasUsuario: [],
    };
  },
  methods: {
    async fetchTareas() {
      try {
        const userId = this.$route.params.id;
        const tareasService = new TareasService();
        const response = await tareasService.obtenerTareasPorUsuario(userId);

        if (Array.isArray(response)) {
          this.tareas = response;
        } else {
          console.error('El formato de las tareas no es válido:', response);
        }
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    },
    async fetchEtiquetas() {
      try {
        const userId = this.$route.params.id;
        const etiquetaService = new EtiquetasService();
        const response = await etiquetaService.obtenerEtiquetasPorUsuario(userId);

        if (Array.isArray(response)) {
          this.etiquetasUsuario = response;
        } else {
          console.error('El formato de las etiquetas no es válido:', response);
        }
      } catch (error) {
        console.error('Error al obtener las etiquetas:', error);
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);

      const day = date.getDate();
      const month = date.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    },
    async cambiarEstado(tarea) {
      try {
        // Lógica para cambiar el estado de la tarea (completada/pendiente)
      } catch (error) {
        console.error('Error al cambiar el estado de la tarea:', error);
      }
    },
    async crearTarea() {
  try {
    // Obtén las etiquetas del usuario como opciones para el select
    const etiquetasOptions = this.etiquetasUsuario.map(etiqueta => ({
      value: etiqueta.id,
      text: etiqueta.nombreEtiqueta,
    }));

    const { value: formValues } = await Swal.fire({
      title: 'Crear Nueva Tarea',
      html:
        '<input id="titulo" class="swal2-input" placeholder="Título de la tarea">' +
        '<input id="fechaLimite" class="swal2-input" placeholder="Fecha límite (DD/MM/YYYY)">' +
        '<select id="idEtiqueta" class="swal2-select" placeholder="Seleccione una etiqueta">' +
        etiquetasOptions.map(option => `<option value="${option.value}">${option.text}</option>`).join('') +
        '</select>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('titulo').value,
          document.getElementById('fechaLimite').value, // Aquí obtén la fecha como cadena en formato "dd/MM/yyyy" (minúsculas)
          document.getElementById('idEtiqueta').value,
        ];
      },
    });

    if (formValues) {
      const [titulo, fechaLimiteStr, idEtiqueta] = formValues;
      const idUsuario = this.$route.params.id;
      const fechaLimiteParts = fechaLimiteStr.split('/');
      const fechaLimiteFormatted = `${fechaLimiteParts[2]}-${fechaLimiteParts[1]}-${fechaLimiteParts[0]}`;
      
      const tareasService = new TareasService();
      const nuevaTarea = await tareasService.crearTarea(titulo, fechaLimiteFormatted, idEtiqueta, idUsuario);
      this.tareas.push(nuevaTarea);
      console.log('Tarea creada con éxito:', nuevaTarea);
    }
  } catch (error) {
    console.error('Error al crear la tarea:', error);
  }
},


    etiquetas() {
      const userId = this.$route.params.id; // Obtener userId desde la ruta actual
      this.$router.push({ name: 'etiquetas', params: { id: userId } });
    },
  },
  created() {
    this.fetchTareas();
    this.fetchEtiquetas();
  },
};
</script>
